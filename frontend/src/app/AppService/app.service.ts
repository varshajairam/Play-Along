import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from '../AppClass/game';
import { CommunicationService } from '../services/communication.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    url: string;
    game: Game;
    constructor(private http: HttpClient, private commService: CommunicationService){

    }

    getGames(userId: number): Observable<Array<Game>> {
        this.url = "getGames";
        let data = {id : userId};
        return this.commService.get(this.url, data)
        //this.http.get(this.url+"?id="+userId)
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
}

