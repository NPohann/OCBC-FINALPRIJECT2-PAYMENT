import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment';
import { Router } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-register-payment',
  templateUrl: './register-payment.component.html',
  styleUrls: ['./register-payment.component.css']
})
export class RegisterPaymentComponent implements OnInit {

  payment: Payment[] = []

  constructor(public paymentService: PaymentService, public router: Router) { }

  ngOnInit(): void {
  }

  form = {
    addPaymentForm : new FormGroup({
      paymentDetailId: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      expirationDate: new FormControl('', [Validators.required]),
      securityCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    })
  }

  get paymentDetailId() {
    return this.form.addPaymentForm.get('paymentDetailId')
  }

  get cardOwnerName() {
    return this.form.addPaymentForm.get('cardOwnerName')
  }

  get cardNumber() {
    return this.form.addPaymentForm.get('cardNumber')
  }

  get expirationDate() {
    return this.form.addPaymentForm.get('expirationDate')
  }

  get securityCode () {
    return this.form.addPaymentForm.get('securityCode')
  }

  addPayment () {
    const data = this.form.addPaymentForm.value
    delete data.paymentDetailId
    this.paymentService.addPayment(data).subscribe(res => {
      if(res) {
        window.alert("Tambah data berhasil!")
        this.form.addPaymentForm.reset()
        this.router.navigate(['payment'])
      }
    })
  }

  navigatePayment() {
    this.router.navigate(['payment'])
  }


}
