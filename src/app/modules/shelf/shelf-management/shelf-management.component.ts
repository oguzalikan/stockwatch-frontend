import { Component, OnInit } from '@angular/core';
import { Shelf } from '../../../shared/model/shelf'; 
import { ShelfService } from '../../../shared/service/shelf.service'; 
import { MatDialog } from '@angular/material/dialog';
import { ShelfCreateComponent } from '../shelf-create/shelf-create.component'; 
import { ToastrService } from 'ngx-toastr';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';
import { ShelfEditComponent } from '../shelf-edit/shelf-edit.component'; 

@Component({
  selector: 'app-shelf-management', 
  templateUrl: './shelf-management.component.html',
  styleUrl: './shelf-management.component.scss'
})
export class ShelfManagementComponent implements OnInit{
  shelves: Shelf[]  = []; 
  selectedShelf: Shelf | null = null; 

  constructor(
    private shelfService: ShelfService, 
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.refreshShelves(); 
  }
  refreshShelves() { 
    this.shelfService.getAllShelves().subscribe({ 
      next: (data) => {
        this.shelves = data; 
      }
    });
  }
  createShelf() { 
    let dialog =  this.dialog.open(ShelfCreateComponent, { 
      width: '500px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      disableClose: true,
    });
    dialog.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          
          this.shelfService.createShelves(data.capacity, data.count).subscribe({ 
            next: (res) => {
              this.toastr.info(res.message + ' shelves created'); 
              this.refreshShelves(); 
            }
          });
        }
      }
    });
  }
  selectShelf(shelf: Shelf) { 
    if (shelf == this.selectedShelf) { 
      this.selectedShelf = null; 
    } else {
      this.selectedShelf = shelf; 
    }
  }
  editShelf() { 
    let dialog =  this.dialog.open(ShelfEditComponent, { 
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });
    dialog.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.shelfService.updateShelf(this.selectedShelf!.id, data.capacity).subscribe({ 
            next: (data) => {
              this.toastr.info('Shelf updated'); 
              this.refreshShelves(); 
            },
            error: (err) => {
              this.toastr.error(err.error.mesaj);
            }
          });
        }
      }
    });
  }
  deleteShelf() { 
    let dialog =  this.dialog.open(YesNoDialogComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });
    dialog.afterClosed().subscribe({
      next: (data) => {
        if (data?.result === 'yes') {
          this._deleteShelf(); 
        }
      }
    });
    dialog.componentInstance.question = 'Are you sure for delete this shelf?'; 
  }
  _deleteShelf() { 
    if (this.selectedShelf) {
      this.shelfService.deleteShelf(this.selectedShelf.id).subscribe({ 
        next: (data) => {
          this.toastr.info('Shelf deleted'); 
          this.refreshShelves(); 
        },
        error: (err) => {
          this.toastr.error(err.error.mesaj);
        }
      });
    }
  }
}
