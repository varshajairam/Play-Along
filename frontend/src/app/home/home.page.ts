import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Game } from '../AppClass/game';
import { OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { AppService } from '../AppService/app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  private myGames: Observable<Game[]>;
  private newGames: Observable<Game[]>;
  //destroy$: Subject<boolean> = new Subject<boolean>();

  private user: any;
  private segmentValue: any = "myGames";
  
  constructor(private appService: AppService) {
    this.user  = {name: "User", id: 1};
  }

  ngOnInit(){
  }

  ngAfterViewInit(){ 
    this.myGames = this.appService.getGames(this.user.id);
    this.populateGames();  
  }

  ngOnDestroy(){
  }

  populateGames(){
    
  }

  segmentChanged(event){
    this.segmentValue = event.detail.value;
  }

}
