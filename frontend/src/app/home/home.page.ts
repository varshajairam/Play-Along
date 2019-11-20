import { Component } from '@angular/core';
import { Game } from '../AppClass/game';
import { OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  private myGames: Array<Game>;
  private newGames: Array<Game>;

  private user: any;
  private segmentValue: any;
  private message: string;
  private showToast: boolean;
  private showSpinner: boolean;
  
  constructor(private homeService: HomeService) {
    this.user  = {name: "User", id: 1};
    this.segmentValue = "myGames";
    this.showToast = false;
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
    this.showToast = true;
    // if(game.cost == 0){
    //   this.message = "You have successfully joined this game!";
    // } else {      
    //   this.message = "Insufficient wallet balance. Please load it here.";
    //   this.message = "Your wallet has been debited with $ " + game.cost + ". You have successfully joined this game!";
    // }
    let data = {id: game.id, owner_id: game.owner_id, game_id: game.game_type_id, amount: game.cost};
    this.homeService.enrollGame(data);
  }

}
