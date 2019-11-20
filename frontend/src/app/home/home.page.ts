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
  private segmentValue: any = "myGames";
  
  constructor(private homeService: HomeService) {
    this.user  = {name: "User", id: 1};
  }

  ngOnInit(){
  }

  ngAfterViewInit(){ 
    this.homeService.getGames(this.user).subscribe(data => {
      this.newGames = data.filter(game => {
        return game.hasJoined == false;
      })
      this.myGames = data.filter(game => {
        return game.hasJoined == true;
      })      
    });
  }

  ngOnDestroy(){
  }

  segmentChanged(event){
    this.segmentValue = event.detail.value;
  }

}
