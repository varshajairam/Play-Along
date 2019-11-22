import { Component, ViewChild } from '@angular/core';
import { Game } from '../AppClass/game';
import { OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HomeService } from './home.service';
import { Toast } from '../toast/toast';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(Toast, {static: true}) private toastComp: Toast; 
  private myGames: Array<Game>;
  private newGames: Array<Game>;

  private user: any;
  private segmentValue: any;
  private displayMsg: string;
  private showSpinner: boolean;
  
  constructor(private homeService: HomeService) {
    this.user  = {name: "User", id: 1};
    this.segmentValue = "myGames";
    this.showSpinner = false;
  }

  ngOnInit(){
    this.showSpinner = true;
  }

  ngAfterViewInit(){ 
    this.homeService.getGames(this.user).subscribe(data => {
      this.newGames = data.filter(game => {
        return game.hasJoined == false;
      })
      this.myGames = data.filter(game => {
        return game.hasJoined == true;
      })
      this.showSpinner = false;      
    });
  }

  ngOnDestroy(){
  }

  segmentChanged(event){
    this.segmentValue = event.detail.value;
  }

  joinGame(game){
    if(game.spots_taken == game.players_count){
      this.displayMsg = "This game is already full! Please join another one.";
    }
    let data = {owner_id: game.owner_id, game_id: game.id, amount: game.cost};
    this.homeService.enrollGame(data).subscribe((res) => {
      if(res[0].resultEnroll == "True" && res[0].enrollResponse == "Success"){
        this.displayMsg = "Your wallet has been debited with $" + game.cost + ". You have successfully joined this game!";
      } else if (res[0].resultEnroll == "True" && res[0].enrollResponse == "Free game"){
        this.displayMsg = "You have successfully joined this game!";
      } else if (res[0].resultEnroll == "False" && res[0].enrollResponse == "No funds"){
        this.displayMsg = "Insufficient balance. Please load your wallet.";
      } else {
        this.displayMsg = "Oops! There seems to be some problem at our end, please try again later.";        
      }
      setTimeout(() => this.toastComp.presentToastWithOptions(), 0);
      console.log("Success");
    }, (err) => {
      console.log("Failed");
    });
  }

}