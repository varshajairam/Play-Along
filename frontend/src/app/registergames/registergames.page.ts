import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../services/communication.service';

@Component({
  selector: 'app-registergames',
  templateUrl: './registergames.page.html',
  styleUrls: ['./registergames.page.scss'],
})
export class RegistergamesPage implements OnInit {
  registerskills = [{games: '', skills: ''}];
  registerskill = false;
  allgames = [];
  allskills = [];
  constructor(private comm: CommunicationService) { }

  ngOnInit() {
    this.getgamedata();
    this.getskilldata();
  }
  getgamedata() {
    this.comm.get('registergamecall').subscribe((res) => {
      if (res instanceof Array) {
        res.forEach((obj) => {
          let gamedata = {name: '', id : 0};
          gamedata.name = obj.name;
          gamedata.id = obj.id;
          this.allgames.push(gamedata);
        });
      }
      console.log('Success');
    }, () => {
      console.log('Failed');
    });
  }

  getskilldata() {
    this.comm.get('registerskillcall').subscribe((res1) => {
      if (res1 instanceof Array) {
        res1.forEach((obj) => {
          let skilldata = {level: ''};
          skilldata.level = obj.level;
          this.allskills.push(skilldata);
        });
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
