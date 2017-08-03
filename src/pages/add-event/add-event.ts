import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  title: string = 'Event';
  startTime: Date = new Date();
  endTime: Date = new Date();
  allDay: boolean = false;
  category: string;
  error: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) { }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  add() {
    if (!this.title)
      return this.error = 'Title required';

    if (!this.category)
      return this.error = 'Category required';

    this.viewCtrl.dismiss({
      title: this.title,
      startTime: this.startTime.toString(),
      endTime: this.endTime.toString(),
      allDay: this.allDay,
      category: this.category
    });
  }
}
