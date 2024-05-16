import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './core/component/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MenuComponent } from './core/component/menu/menu.component';
import { AdminMenuComponent } from './core/component/admin-menu/admin-menu.component';
import { APP_CONFIG } from './app.config';
import { environment } from '../environments/environment';
import { urlInterceptor } from './core/interceptor/url.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ShelfCreateComponent } from './modules/shelf/shelf-create/shelf-create.component';
import { ShelfEditComponent } from './modules/shelf/shelf-edit/shelf-edit.component';
import { ShelfManagementComponent } from './modules/shelf/shelf-management/shelf-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    AdminMenuComponent,
    ShelfCreateComponent,
    ShelfEditComponent,
    ShelfManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
    ReactiveFormsModule,
    HttpClientModule, 
    MatIconModule,
    MatDialogModule,
  ],
  
  providers: [
    provideHttpClient(withInterceptors([urlInterceptor])),
    {
      provide: APP_CONFIG,
      useValue: environment,
    },
    { provide: LOCALE_ID, useValue: 'tr'},
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
