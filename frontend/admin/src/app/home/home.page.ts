import { Component } from '@angular/core';
import { CommunicationService } from './../services/communication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	segmentValue = "activeUsers";
	users: any = []

  	constructor(private comm: CommunicationService) {
  		this.fetch_users();
  	}

  	fetch_users() {
  		this.comm.sendPost('getAllUsers').subscribe((result) => {
  			this.users = result;
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
