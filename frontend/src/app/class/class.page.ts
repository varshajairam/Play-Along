import { Component, OnInit } from '@angular/core';
import {GetClass} from '../AppClass/class';

@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit {

  private myClasses: Array<GetClass>;
  private newClasses: Array<GetClass>;

  //private user: any;
  private segmentValue: any;
  //private displayMsg: string;
  private showSpinner: boolean;

  constructor() { }

  ngOnInit() {
    this.showSpinner = true;
  }

  ngAfterViewInit(){

  }

    segmentChanged(event) {
    this.segmentValue = event.detail.value;
  }

}
