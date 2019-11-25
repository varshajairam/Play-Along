import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module as StripeModule } from "stripe-angular";
import { WalletComponent } from "./wallet.component";

@NgModule({
  declarations: [WalletComponent],
  imports: [
    CommonModule,
    StripeModule
  ]
})
export class WalletModule { }