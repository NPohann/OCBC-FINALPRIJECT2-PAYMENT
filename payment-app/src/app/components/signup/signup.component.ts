import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  get username() {
    return this.signupForm.get('username')
  }

  get email() {
    return this.signupForm.get('email')
  }

  get password() {
    return this.signupForm.get('password')
  }

  ngOnInit(): void {
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe(res => {
      if(res){
        window.alert("Register berhasil!")
        this.signupForm.reset()
        this.router.navigate(['login'])
      }
       
    })
  }

  navigateLogin(){
    this.router.navigate(['login'])
  }

}
