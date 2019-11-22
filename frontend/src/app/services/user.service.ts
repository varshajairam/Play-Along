import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	logged_in = false;
	user_obj;

	constructor(private comm: CommunicationService) {
	}

	getUserDetails() {
		return new Observable((observer) => {
			if (this.user_obj)
				observer.next(this.user_obj);
			else {
				this.comm.sendPost('getUserDetails').subscribe((res) => {
					this.user_obj = res;
					observer.next(res);
				})
			}
		})
	}
}
