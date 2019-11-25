import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CommunicationService } from './../services/communication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	segmentValue = "activeUsers";
	users: any = []

  	constructor(private comm: CommunicationService, private alert: AlertController) {
  		this.fetch_users();
  	}

  	fetch_users() {
  		this.comm.sendPost('getAllUsers').subscribe((result) => {
  			this.users = result;
  		});
  	}

  	update_user_click_handler(index, user_email, is_blocked) {
  		this.alert.create({
  			header: "Are you sure?",
  			message: "Are you sure you want to update the user status?",
  			buttons: [{
  				text: 'Cancel',
  				role: 'cancel'
  			}, {
  				text: 'Yes',
  				handler: this.update_user_status.bind(this, index, user_email, is_blocked)
  			}]
  		}).then((alert) => {
  			alert.present();
  		});
  	}

  	update_user_status(index, user_email, is_blocked) {
  		this.comm.sendPost('updateUserStatus', {
  			is_blocked: is_blocked,
  			email: user_email
  		}).subscribe(() => {
  			this.users[index].is_blocked = is_blocked;
  		});
  	}

}
