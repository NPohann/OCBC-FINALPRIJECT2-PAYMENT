import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './components/payment/payment.component';
import { AuthService } from './services/auth.service';
import { PaymentService } from './services/payment.service';
import { httpInterceptorProviders } from './interceptors';
import { RegisterPaymentComponent } from './components/register-payment/register-payment.component';
import { UpdatePaymentComponent } from './components/update-payment/update-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    PaymentComponent,
    RegisterPaymentComponent,
    UpdatePaymentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AuthService, PaymentService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
