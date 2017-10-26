import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  title: string = '';
  startDate: string = new Date().toISOString();
  startTime: string = new Date().toISOString();
  endDate: string = new Date().toISOString();
  endTime: string = new Date().toISOString();
  allDay: boolean = false;
  category: string = '';
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

    const startDate = new Date(this.startDate);
    const startTime = new Date(this.startTime);
    const endDate = new Date(this.endDate);
    const endTime = new Date(this.endTime);

    this.viewCtrl.dismiss({
      title: this.title,
      startTime: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes() + startTime.getTimezoneOffset()
      ).toISOString(),
      endTime: new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes() + endTime.getTimezoneOffset()
      ).toISOString(),
      allDay: this.allDay,
      category: this.category,
      location: this.location
    });
  }
}
