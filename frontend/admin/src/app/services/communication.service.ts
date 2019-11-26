import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient) {}
  get(route, data=null) {
  	let getData = new URLSearchParams();
  	for (const key in data) {
  		getData.set(key, data[key]);
  	}
  	return this.http.get(environment.serverRoot + route + "?" + getData.toString(), {withCredentials: true});
  }

  sendPost(route, data=null) {
  	const postData = new URLSearchParams();
  	let headers = {
    	headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      withCredentials: true
  	}
  	for (const key in data) {
  		postData.set(key, data[key]);
  	}

  	return this.http.post(environment.serverRoot + route, postData.toString(), headers);
  }
}
