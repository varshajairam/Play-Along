import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  HttpUploadOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" })
  }
  formData = {username:"", password:""};

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  login(form){
    let x = new URLSearchParams();
    x.set("username", this.formData.username);
    x.set("password", this.formData.password);
    this.http.post("http://localhost:3000/login", x.toString(), this.HttpUploadOptions).subscribe(() => {
      console.log("Success");
    }, () => {
      console.log("Failed");
    })
  }

}
