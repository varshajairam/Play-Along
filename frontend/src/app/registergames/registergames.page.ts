import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../services/communication.service';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { all } from 'q';

@Component({
  selector: 'app-registergames',
  templateUrl: './registergames.page.html',
  styleUrls: ['./registergames.page.scss'],
})
export class RegistergamesPage implements OnInit {
  registerskills = [{games: '', skills: ''}];
  registerskill = false;
  url1 = 'http://localhost:3000/registergamecall';
  url2 = 'http://localhost:3000/registerskillcall';

  allgames = [];
  allskills = [];
  constructor(private comm: CommunicationService, private http: HttpClient) { }


  ngOnInit() {
  }
  getgamedata(){
    this.http.get(this.url1).subscribe((res) => {
      if(res instanceof Array){
        res.forEach((obj) => {
          let gamedata = {name: '', id : 0};
          gamedata.name = obj["name"];
          gamedata.id = obj['id'];
          this.allgames.push(gamedata);
        })
      }
      console.log('Success');
    }, () => {
      console.log('Failed');
    });
  }

  getskilldata(){
    this.http.get(this.url2).subscribe((res1) => {
      if(res1 instanceof Array){
        res1.forEach((obj) => {
          let skilldata = {level: ''};
          skilldata.level = obj["level"];
          this.allskills.push(skilldata);
        })
      }
      console.log('Success');
    }, () => {
      console.log('Failed');
    });
  }


  addSkill() {
    this.registerskills.push({games: '', skills: ''});
  }
  deleteSkill() {
    this.registerskills.pop();
  }
  registergame(form) {
    console.log(this.registerskills);
    this.comm.sendPost('register', this.registerskills).subscribe(() => {
      console.log('Success');
    }, () => {
      this.registerskill = true;
      console.log('Failed');
    });
  }

}
