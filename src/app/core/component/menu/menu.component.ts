import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  url = "";
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          this.url = event.url;
        }
      }
    });
  }

  logout() {
    this.toastr.info('Logged out');
    this.loginService.logout();
    this.router.navigateByUrl('/');
  }
}
