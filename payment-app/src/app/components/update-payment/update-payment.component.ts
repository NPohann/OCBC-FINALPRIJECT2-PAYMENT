import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.css']
})
export class UpdatePaymentComponent implements OnInit {

  paymentId: number

  constructor(public paymentService: PaymentService, public activatedRoute: ActivatedRoute, public router: Router) { 
    this.paymentId = this.activatedRoute.snapshot.params.id
  }

  ngOnInit(): void {
    this.paymentService.getPaymentDetails(this.paymentId).subscribe(res => {
      console.log(res);
      this.paymentDetailId?.setValue(res.paymentDetailId)
      this.cardOwnerName?.setValue(res.cardOwnerName)
      this.cardNumber?.setValue(res.cardNumber)
      this.expirationDate?.setValue(res.expirationDate)
      this.securityCode?.setValue(res.securityCode)
    })
  }

  form = {
    updatePaymentForm: new FormGroup({
      paymentDetailId: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      expirationDate: new FormControl('', [Validators.required]),
      securityCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    })
  }

  get paymentDetailId() {
    return this.form.updatePaymentForm.get('paymentDetailId')
  }

  get cardOwnerName() {
    return this.form.updatePaymentForm.get('cardOwnerName')
  }

  get cardNumber() {
    return this.form.updatePaymentForm.get('cardNumber')
  }

  get expirationDate() {
    return this.form.updatePaymentForm.get('expirationDate')
  }

  get securityCode() {
    return this.form.updatePaymentForm.get('securityCode')
  }

  updatePayment () {
    this.paymentService.updatePayment(this.form.updatePaymentForm.value).subscribe(res => {
      if(res){
      window.alert("Update data berhasil!")
      this.router.navigate(['payment'])
      }
    })
  }

  navigatePayment() {
    this.router.navigate(['payment'])
  }

}
