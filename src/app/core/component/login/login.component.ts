import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.email],
    password: '',
  })

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  submit() {
    let email = this.loginForm.get('email')!.value;
    let password = this.loginForm.get('password')!.value;
    
    this.loginService.login(email, password).subscribe({
      next: (resp) => {
        // login başarılı cevabı döndü
        this.toastr.success('Logged in');
        let userIsAdmin = this.loginService.userHasRole('admin');
        this.router.navigateByUrl(userIsAdmin ? 'admin':'/menu');
      },
      error: (err) => {
        this.toastr.error('Error occured');
        // formun tüm alanlarının değerleri değiştirilmek isteniyorsa setValue fonksiyonu kullanılır.
        // Tüm alanların değerleri değiştirilmeyecekse patchValue fonksiyonu kullanılır.
        this.loginForm.patchValue({ password: '' });
        console.error(err);
      }
    });
  }
  signup() {
    let email = this.loginForm.get('email')!.value;
    let password = this.loginForm.get('password')!.value;
    
    this.loginService.signup(email, password).subscribe({
      next: (resp) => {
        // login başarılı cevabı döndü
        this.toastr.success('Sign Up and Login Succesful');
        this.router.navigateByUrl('/menu');
      },
      error: (err) => {
        this.toastr.error('Error occured');
        // formun tüm alanlarının değerleri değiştirilmek isteniyorsa setValue fonksiyonu kullanılır.
        // Tüm alanların değerleri değiştirilmeyecekse patchValue fonksiyonu kullanılır.
        this.loginForm.patchValue({ password: '' });
        console.error(err);
      }
    });
  }
}