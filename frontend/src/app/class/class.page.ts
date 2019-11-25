import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {GetClass} from '../AppClass/class';
import {ClassService} from './class.service';
import { ToastService } from "../services/toast.service";

@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit, AfterViewInit {
  private myClasses: Array<GetClass>;
  private newClasses: Array<GetClass>;

  private user: any;
  private zipcode: number;
  private segmentValue: any;
  private displayMsg: string;
  private showSpinner: boolean;

  constructor(private classService: ClassService, private toastService: ToastService) {
    this.segmentValue = 'myClasses';
    //this.myClasses = [];
    //this.newClasses = [];
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    this.classService.getClass(this.user).subscribe(data => {
      this.newClasses = data.filter(game => {
        return game.hasJoined == false;
      })
      this.myClasses = data.filter(game => {
        return game.hasJoined == true;
      })
      this.showSpinner = false;
    });
  }

  getClasses(){
    this.showSpinner = true;

    this.user = {zipcode: this.zipcode};
    this.classService.getClass(this.user).subscribe(data => {
      this.newClasses = data.filter(classObj => {
        return classObj.hasJoined == false;
      })
      this.myClasses = data.filter(classObj => {
        return classObj.hasJoined == true;
      })
      this.showSpinner = false;
    })
  }

  segmentChanged(event) {
    this.segmentValue = event.detail.value;
  }

  enrollClass(classRes: GetClass){
    //xthis.showSpinner = false;
    if(classRes.spots_taken == classRes.student_count){
      this.displayMsg = "This game is already full! Please join another one.";
    }
    //const values = [[[req.body.cost,userId,req.body.instructor_id,req.body.class_id]]];
    let data = { class_id: classRes.id, cost: classRes.cost, instructor_id: classRes.instructor_id};
    this.classService.enrollClass(data).subscribe((res) => {
      if(res[0].resultEnroll == "True" && res[0].enrollResponse == "Success"){
        this.displayMsg = "Your wallet has been debited with $" + classRes.cost + ". You have successfully joined this game!";
      } else if (res[0].resultEnroll == "True" && res[0].enrollResponse == "Free game"){
        this.displayMsg = "You have successfully joined this game!";
      } else if (res[0].resultEnroll == "False" && res[0].enrollResponse == "No funds"){
        this.displayMsg = "Insufficient balance. Please load your wallet.";
      } else {
        this.displayMsg = "Oops! There seems to be some problem at our end, please try again later.";
      }
      setTimeout(() => this.toastService.presentToastWithOptions(this.displayMsg), 0);
      console.log("Success");
    }, (err) => {
      console.log("Failed");
    });
  }
}
