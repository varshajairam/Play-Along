import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Game } from '../AppClass/game';
import { OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { AppService } from '../AppService/app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  games: Game[];
  game: Game;
  id: number;
  game_type_id: number;
  name: string;
  date: Date;
  players_count: number;
  cost: number;
  apt: string;
  street: string;
  city: string;
  country: string;
  zipcode: number;
  created_by: string;
  created_on: Date;
  owner_id: number;
  destroy$: Subject<boolean> = new Subject<boolean>();

  user: any;
  users: any[];
  compareWith: any;
  segmentValue: any = "myGames";
  newGames: any = []; // delete
  
  constructor(private appService: AppService) {
    this.games = new Array<Game>();
    this.user  = {name: "User ", zipcode: 95126};
    this.newGames = [
      {
        id: 2,
        game_type_id: 1,
        name: 'Basketball meet',
        date: '2019-12-25',
        players_count: 22,
        cost: 5,
        skills: ["Beginner", "Advanced"],
        address: '{apt:"",street:"Hello Ave",city:"San Jose",country:"CA",zipcode:95132}',
        created_by: 1,
        created_on: '2019-11-17',
        owner_id: 1
      }
    ];
  }

  ngOnInit(){
  }

  ngAfterViewInit(){ 
    // make call to fetch user details
    

    // populate response in games array

    // TO-DO
    // this.appService.getGames(user.zipcode).pipe(takeUntil(this.destroy$)).subscribe((response: any[])=> {
    //   console.log(response);
    //   this.populateGames(response);
    // });
    
    this.appService.getLocation().pipe(takeUntil(this.destroy$)).subscribe({
      next(position) { console.log('Current Position: ', position); },
      error(msg) { console.log('Error Getting Location: ', msg); }
  });

  /* DUMMY CODE */
  const myObservable = of(
  //     [{  
  //       id: 1,
  //       game_type_id: 1,
  //       name: "xyz",
  //       date: "11-16-2019",
  //       players_count: 10,
  //       cost: 50,
  //     apt: "Bellevue",
  //     street: "Oak St",
  //     city: "Houston",
  //     country: "United States of America",
  //     zipcode: 12345,
  //     created_by: "abc",
  //     created_on: "11-15-2019",
  //     owner_id: 1
  // },
  // {  
  //   id: 2,
  //   game_type_id: 2,
  //   name: "mno",
  //   date: "11-17-2019",
  //   players_count: 5,
  //   cost: 20,
  //   apt: "Grant",
  //   street: "High St",
  //   city: "Austin",
  //   country: "United States of America",
  //   zipcode: 67676,
  //   created_by: "ooo",
  //   created_on: "11-14-2019",
  //   owner_id: 2
  // },
  // {  
  // id: 3,
  // game_type_id: 3,
  // name: "ghi",
  // date: "11-20-2019",
  // players_count: 20,
  // cost: 8,
  // apt: "Garden View",
  // street: "Corner St",
  // city: "Cleveland",
  // country: "United States of America",
  // zipcode: 44445,
  // created_by: "qwe",
  // created_on: "11-11-2019",
  // owner_id: 3
  // },
  // {  
  // id: 4,
  // game_type_id: 4,
  // name: "hyt",
  // date: "11-23-2019",
  // players_count: 16,
  // cost: 13,
  // apt: "GGG",
  // street: "Sample St",
  // city: "City",
  // country: "United States of America",
  // zipcode: 78654,
  // created_by: "vrv",
  // created_on: "11-13-2019",
  // owner_id: 1
  // },
  // {  
  // id: 5,
  // game_type_id: 5,
  // name: "sss",
  // date: "11-30-2019",
  // players_count: 5,
  // cost: 20,
  // apt: "Oatman",
  // street: "Blue St",
  // city: "Denver",
  // country: "United States of America",
  // zipcode: 39311,
  // created_by: "crt",
  // created_on: "11-2-2019",
  // owner_id: 4
  // }]
  [
    {
      id: 1,
      game_type_id: 1,
      name: 'Football meet',
      date: '2019-12-25',
      players_count: 22,
      cost: 5,
      skills: ["Beginner", "Advanced"],
      address: {apt:"1234",street:"Zombie Ave",city:"San Jose",country:"CA",zipcode:95132},
      created_by: 1,
      created_on: '2019-11-17',
      owner_id: 1
    },
    {
      id: 1,
      game_type_id: 1,
      name: 'Football meet',
      date: '2019-12-25',
      players_count: 22,
      cost: 5,
      skills: ["Beginner", "Advanced"],
      address: {apt:"",street:"Zombie Ave",city:"San Jose",country:"CA",zipcode:95132},
      created_by: 1,
      created_on: '2019-11-17',
      owner_id: 1
    }
  ]
  );



  // this.compareWith = (o1, o2) => {
  //   return o1 && o2 ? o1.id === o2.id : o1 === o2;
  // };
  
      // Create observer object
  const myObserver = {
    next: x => this.populateGames(x),
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };
  
  myObservable.subscribe(myObserver);
  /*DUMMY CODE ENDS*/
  
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  populateGames(data: any){
    for(let obj of data){  
      this.game = new Game();    
      this.game.map(obj);
      this.games.push(this.game);
    }
  }

  segmentChanged(event){
    console.log(event);
    this.segmentValue = event.detail.value;
  }

}
