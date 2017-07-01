import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  title: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  category: string;
  error: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) { }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  add() {
    if (!this.title)
      return this.error = 'Title required';

    if (!this.startTime)
      return this.error = 'Start time required';

    if (!this.endTime)
      return this.error = 'End time required';

    if (!this.category)
      return this.error = 'Category required';

    this.viewCtrl.dismiss({
      title: this.title,
      startTime: this.startTime,
      endTime: this.endTime,
      allDay: this.allDay,
      category: this.category
    });
  }
}
