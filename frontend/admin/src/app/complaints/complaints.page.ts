import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CommunicationService } from './../services/communication.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {

	active_complaints: any = []

  	constructor(private comm: CommunicationService, private alert: AlertController) { }

	ngOnInit() {
		this.get_active_complaints();
	}

	get_active_complaints() {
		this.comm.sendPost('getActiveComplaints').subscribe((result) => {
			this.active_complaints = result;
		});
	}

	resolve_click_handler(complaint_id) {
		this.alert.create({
			header: "Resolve Complaint",
			message: "Are you sure you want to resolve the complaint?",
			inputs: [{
				name: "message",
				placeholder: "Enter resolve message."
			}],
			buttons: [{
	        	text: 'Cancel',
	          	role: 'cancel'
	        }, {
	        	text: "Submit",
	        	handler: this.resolve_submit_handler.bind(this, complaint_id)
	      	}]
		}).then((alert) => {
			alert.present();
		})
	}

	resolve_submit_handler(complaint_id, value) {
		this.comm.sendPost('resolveComplaints', {review_message: value.message, complaint_id: complaint_id}).subscribe(() => {
			for (var i = 0; i < this.active_complaints.length; i++) {
				if (this.active_complaints[i].id == complaint_id) {
					this.active_complaints.splice(i, 1);
					break;
				}
			}
		});
	}

}
