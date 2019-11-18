import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(private http: HttpClient){

    }

    getGames(zipcode: number) {
        return this.http.get("URL"+zipcode);
    }

    getLocation() {
        return new Observable((observer) => {
            const {next, error} = observer;
            let watchId;
        
            if('geolocation' in navigator){
                watchId = navigator.geolocation.watchPosition(next, error);
            } else {
                error('Geolocation not available');
            }
        
            return {unsubscribe() {navigator.geolocation.clearWatch(watchId); }};
        });
    }
    
}

