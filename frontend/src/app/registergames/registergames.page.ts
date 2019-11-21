import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-registergames',
  templateUrl: './registergames.page.html',
  styleUrls: ['./registergames.page.scss'],
})
export class RegistergamesPage implements OnInit {
  HttpUploadOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };
  registerskills = [{games: '', skills: ''}];
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
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  addSkill() {
    this.registerskills.push({games: '', skills: ''});
  }
  deleteSkill() {
    this.registerskills.pop();
  }
  registergame(form){
    let nx = new URLSearchParams();
    nx.set('game', this.registerskills.games);
    nx.set('skill', this.registerskills.skills);
    console.log(this.registerskills);
  }

}
