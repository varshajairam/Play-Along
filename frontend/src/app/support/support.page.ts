import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../services/communication.service';
import { ToastService } from './../services/toast.service'; 

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

	formData = {
		title: "",
		description: ""
	}

	constructor(private comm: CommunicationService, private toast: ToastService) { }

	ngOnInit() {
	}

	submitQuery() {
		this.comm.sendPost('makeComplaint', this.formData).subscribe(() => {
			this.toast.presentToastWithOptions("Complaint made successfully.");
		});
	}

}
