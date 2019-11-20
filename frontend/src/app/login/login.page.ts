import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../services/communication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  formData = {username:"", password:""};
  loginError = false;

  constructor(private comm: CommunicationService) { }

  ngOnInit() {
  }

  login(form){
    this.comm.sendPost("login", this.formData).subscribe(() => {
      console.log("Success");
    }, () => {
      this.loginError = true;
      console.log("Failed");
    })
  }

}
