import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CommunicationService } from './../services/communication.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  segmentValue = "games";
  games: any = [];
  skills: any = [];

  constructor(private comm: CommunicationService, private alert: AlertController) {
  }

  ngOnInit() {
    this.get_games();
    this.get_skills();
  }

  add_click_handler(type) {
    this.alert.create({
      header: "Add " + type,
      message: "Note: An item added to the enum cannot be deleted.",
      inputs: [{
        name: "name",
        placeholder: "Enter the game name."
      }],
      buttons: [{
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: "Submit",
          handler: this.add_submit_handler.bind(this, type)
      }]
    }).then((alert) => {
      alert.present();
    })
  }

  add_submit_handler(type, value) {
    let route;
    if (type == "Game")
      route = "insertGame";
    else
      route = "insertSkill";

    this.comm.sendPost(route, value).subscribe(() => {
      if (type == "Game")
        this.games.push(value);
      else
        this.skills.push({level: value.name});
    });
  }

  get_games() {
    this.comm.sendPost('getAllGames').subscribe((result) => {
      this.games = result;
    });
  }

  get_skills() {
    this.comm.sendPost('getAllSkills').subscribe((result) => {
      this.skills = result;
    });
  }
}
