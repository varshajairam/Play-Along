import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {GetClass} from '../AppClass/class';
import { CommunicationService } from '../services/communication.service';

@Injectable({
    providedIn: 'root'
})
export class ClassService {
    url: string;
    class: GetClass;
    constructor(private http: HttpClient, private commService: CommunicationService) {

    }

    getClass(user): Observable<Array<GetClass>> {
        this.url = 'getClass';
        return this.commService.get(this.url, user)
            .pipe(map(res => {
                if (res instanceof Array) {
                    return res.map(item => {
                        this.class = new GetClass();
                        this.class.map(item);
                        return this.class;
                    })
                }
            }))
    }

    enrollClass(classDetail) {
        this.url = "enrollClass";
        return this.commService.sendPost(this.url, classDetail);
    }
}

