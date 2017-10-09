import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  title: string = '';
  startTime: string = new Date().toISOString();
  endTime: string = new Date().toISOString();
  allDay: boolean = false;
  category: string = '';
  subCategory: string = '';
  location: string;
  error: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) { }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  add() {
    if (!this.title) return this.error = 'Title required';
    if (!this.category) return this.error = 'Category required';
    if (!this.location) return this.error = 'Location required';

    const startTime = new Date(this.startTime);
    const endTime = new Date(this.endTime);

    this.viewCtrl.dismiss({
      title: this.title,
      startTime: new Date(
        startTime.getFullYear(),
        startTime.getMonth(),
        startTime.getDate(),
        startTime.getHours(),
        startTime.getMinutes() + startTime.getTimezoneOffset()
      ).toISOString(),
      endTime: new Date(
        endTime.getFullYear(),
        endTime.getMonth(),
        endTime.getDate(),
        endTime.getHours(),
        endTime.getMinutes() + endTime.getTimezoneOffset()
      ).toISOString(),
      allDay: this.allDay,
      category: this.category,
      subCategory: this.subCategory,
      location: this.location
    });
  }
}
