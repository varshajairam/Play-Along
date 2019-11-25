import { Component } from "@angular/core"
import { StripeToken, StripeSource } from "stripe-angular"
 
const template=
`
<div *ngIf="invalidError" style="color:red">
  {{ invalidError.message }}
</div>
 
<stripe-card
  #stripeCard
  (catch) = "onStripeError($event)"
  [(invalid)] = "invalidError"
  (tokenChange) = "setStripeToken($event)"
  (sourceChange) = "setStripeSource($event)"
></stripe-card>
 
<button type="button" (click)="stripeCard.createToken(extraData)">createToken</button>
`
@Component({
  selector: "stripe-token",
  template: template
}) export class StripeTokenComponent{
  extraData = {
    "name": null,
    "address_city ": null,
    "address_line1": null,
    "address_line2": null,
    "address_state": null,
    "address_zip": null
  }
 
  onStripeInvalid( error:Error ){
    console.log('Validation Error', error)
  }
 
  setStripeToken( token:StripeToken ){
    console.log('Stripe token', token)
  }
 
  setStripeSource( source:StripeSource ){
    console.log('Stripe source', source)
  }
 
  onStripeError( error:Error ){
    console.error('Stripe error', error)
  }
}