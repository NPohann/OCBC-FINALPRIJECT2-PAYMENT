import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  get email() {
    return this.signinForm.get('email')
  }

  get password() {
    return this.signinForm.get('password')
  }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signIn(this.signinForm.value).subscribe((res:any)=> {
      if(res) {
        window.alert("Login berhasil, selamat datang!")
        this.authService.setAuthorizationToken(res.token)
        this.authService.setRefreshToken(res.refreshToken)
        this.signinForm.reset()
        this.router.navigate(['payment'])
      } else {
        window.alert("Login gagal, username atau password salah!")
      }
    })
  }

  navigateRegister() {
    this.router.navigate(['signup'])
  }

}
