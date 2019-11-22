import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StripeScriptTag } from "stripe-angular"

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  constructor(public StripeScriptTag:StripeScriptTag) {
    this.StripeScriptTag.setPublishableKey( environment.stripePublishKey )
  }

  ngOnInit() {
    
  }

  
  }
