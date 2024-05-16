import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { MenuComponent } from './core/component/menu/menu.component';
import { AdminMenuComponent } from './core/component/admin-menu/admin-menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, children: [
      { path: 'product', loadChildren: 
          () => import('./modules/product/product.module')
          .then(m => m.ProductModule)
      },
      { path: 'shelf', loadChildren: 
          () => import('./modules/shelf/shelf.module')
          .then(m => m.ShelfModule)
      },
  ]
  },
  { path: 'admin', component: AdminMenuComponent},
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
