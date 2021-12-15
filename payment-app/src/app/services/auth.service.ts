import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Payment } from '../models/payment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = 'https://payment-api-finalproject.herokuapp.com/api'
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('app_token')
    return (authToken) ? true : false
  }

  

  constructor(private http: HttpClient, private router: Router) { }


  // Service untuk SignUp User
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/authmanagement/register`
    return this.http
      .post(api, user)
      .pipe( catchError(this.handleError))
  }

  // Service untuk SignIn User
  signIn(user: User): Observable<any> {
    let api = `${this.endpoint}/authmanagement/login`
    return this.http
      .post(api, user)
      .pipe( catchError(this.handleError))
  }

  refreshToken() {
    const token = this.getAuthorizationToken();
    const refreshToken = this.getRefreshToken();

    return this.http
      .post(`${this.endpoint}/authmanagement/refreshtoken`, { token, refreshToken })
      .pipe(catchError(this.handleError));
  }

  // Service untuk mendapatkan Token
  getAuthorizationToken() {
    return localStorage.getItem('app_token')
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token')
  }

  // Service untuk set Token
  setAuthorizationToken(token:string) {
    return localStorage.setItem('app_token', token)
  }

  setRefreshToken(token:string) {
    return localStorage.setItem('refresh_token', token)
  }


  // Error Handling
  handleError(error: HttpErrorResponse) {
    let msg = ''
    if(error.error instanceof ErrorEvent) {
      msg = error.error.message
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(msg)
  } 
}
