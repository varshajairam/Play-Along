import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.html',
  styleUrls: ['header.scss'],
})
export class Header {
    title: string;
    constructor() {
        this.title = "ddjkd";
    }

}