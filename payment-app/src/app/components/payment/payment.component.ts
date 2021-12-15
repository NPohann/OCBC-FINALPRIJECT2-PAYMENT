import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payment: Payment[] = []

  constructor(public paymentService: PaymentService, public router: Router) { }

  form = {
    paymentForm : new FormGroup({
      paymentDetailId: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
      expirationDate: new FormControl('', [Validators.required]),
      securityCode: new FormControl('', [Validators.required])
    })
  }

  get paymentDetailId () {
    return this.form.paymentForm.get('paymentDetailId')
  }

  get cardOwnerName() {
    return this.form.paymentForm.get('cardOwnerName')
  }

  get cardNumber() {
    return this.form.paymentForm.get('cardNumber')
  } 

  get expirationDate() {
    return this.form.paymentForm.get('expirationDate')
  }

  get securityCode() {
    return this.form.paymentForm.get('securityCode')
  }


  ngOnInit(): void {
    this.getPayment()
  }

  // Get All Payment Data
  getPayment () {
    this.paymentService.getPayment().subscribe(data => {
      this.payment = data
    })
  }

  // Navigate to add payment
  createPayment() {
    this.router.navigate(['register'])
  }

  // Set edit payment value
  editPayment(payment: Payment) {
    this.router.navigate(['update', payment.paymentDetailId])
  }

  // Delete payment data
  deletePayment(id:number) {
    if(confirm("Delete this payment data?")) {
      this.paymentService.deletePayment(id).subscribe(data => {
        window.alert("Data berhasil dihapus!")
        this.getPayment()
      })
    }
  }
}
