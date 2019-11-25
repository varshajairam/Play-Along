import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommunicationService } from '../services/communication.service';
import { ToastService } from '../services/toast.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit, AfterViewInit {
  url: string;
  balance: Observable<any>;
  amount: number;
  displayMsg: string;
  constructor(private commService: CommunicationService, private toastService: ToastService) {
  }

  ngOnInit() {
    this.url = "getWallet";
  }

  ngAfterViewInit() {
    this.balance = this.commService.get(this.url, null).pipe(map(res => {
      return res[0].balance;
    }));
  }

  openCheckout() {
    let self = this;
    let that =  this;
    let handler = (<any>window).StripeCheckout.configure({
      key: environment.stripePublishKey,
      locale: 'auto',
      token: () => {
        this.url = "loadWallet";
        let data = {"amount": this.amount};
        this.commService.sendPost(this.url, data).subscribe((res) => {
          if(res[0].response == "Success"){
            this.displayMsg = "Your wallet has been loaded with $" + this.amount + ".";
          } else {
            this.displayMsg = "Oops! There seems to be some problem at our end, please try again later.";
          }
          setTimeout(() => this.toastService.presentToastWithOptions(this.displayMsg), 0);
          console.log("Success");
        }, (err) => {
          console.log("Failed");
        })
      }  
    });

    handler.open({
      name: 'Complete transaction',
      description: '',
      amount: this.amount * 100
    });
  }  
}
