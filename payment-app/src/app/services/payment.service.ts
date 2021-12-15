import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Payment } from '../models/payment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  endpoint: string = 'https://payment-api-finalproject.herokuapp.com/api'

  constructor(private http: HttpClient) { }


  // Service untuk tampil data payment
  getPayment(): Observable<any> {
    return (
      this.http
        .get(`${this.endpoint}/payment`)
        .pipe(catchError(this.handleError))
    )
  }

  // Service untuk get detail payment
  getPaymentDetails(id: number): Observable<any> {
    return (
      this.http
        .get(`${this.endpoint}/payment/${id}`)
        .pipe(catchError(this.handleError))
    )
  }

  // Service untuk add data payment
  addPayment(payment: Payment): Observable<any> {
    return (
      this.http
        .post(`${this.endpoint}/payment`, payment)
        .pipe(catchError(this.handleError))
    )
  }

  // Service untuk update data payment
  updatePayment(payment: Payment): Observable<any> {
    const {paymentDetailId} = payment
    return (
      this.http
        .put(`${this.endpoint}/payment/${paymentDetailId}`, payment)
        .pipe(catchError(this.handleError))
    )
  }

  deletePayment(id:number) {
    return (
      this.http
        .delete(`${this.endpoint}/payment/${id}`)
        .pipe(catchError(this.handleError))
    )
  }

  // Service untuk error Handling
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
