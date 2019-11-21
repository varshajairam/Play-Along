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
  // allgames = this.comm.get(,)
  allgames = [
    {game: 'Football', ID: '1'},
    {game: 'Cricket', ID: '2'},
    {game: 'Basketball', ID: '3'},
    {game: 'Tennis', ID: '4'},
    {game: 'Baseball', ID: '5'},
  ];
  allskills = [
      {skill: 'Beginner'},
      {skill: 'Intermediate'},
      {skill: 'Expert'}];
  constructor(private comm: CommunicationService) { }

  ngOnInit() {
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
