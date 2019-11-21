import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from '../AppClass/game';
import { CommunicationService } from '../services/communication.service';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    url: string;
    game: Game;
    constructor(private http: HttpClient, private commService: CommunicationService){

    }

    getGames(user): Observable<Array<Game>> {
        this.url = "getGames";
        return this.commService.get(this.url, user)
        .pipe(map(res => {
            if(res instanceof Array){
                return res.map(item =>{                    
                    this.game = new Game();
                    this.game.map(item);
                    return this.game;
                })
            }
        })) 
    }
    
    enrollGame(gameDetail){
        this.url = "enrollGame";
        return this.commService.sendPost(this.url, gameDetail)
        .subscribe(() => {
            console.log("Success");
          }, () => {
            console.log("Failed");
          })
    }
}

