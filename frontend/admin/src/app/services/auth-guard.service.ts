import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './../services/user.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private user: UserService, private navCtrl: NavController) { }

  canActivate(route: ActivatedRouteSnapshot) {
  	if (!this.user.logged_in) {
  		this.navCtrl.navigateRoot('/logintemp');
  		return false;
  	}
  	return true;
  }
}
