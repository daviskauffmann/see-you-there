import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  title: string = 'EFSC vs. ';
  startTime: string = new Date().toISOString();
  endTime: string = new Date().toISOString();
  allDay: boolean = false;
  category: string = 'Sports';
  subCategory: string = 'Soccer';
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
    if (!this.title)
      return this.error = 'Title required';

    if (!this.category)
      return this.error = 'Category required';

    if (!this.location)
      return this.error = 'Location required';

    this.viewCtrl.dismiss({
      title: this.title,
      startTime: new Date(this.startTime).toString(),
      endTime: new Date(this.endTime).toString(),
      allDay: this.allDay,
      category: this.category,
      subCategory: this.subCategory,
      location: this.location
    });
  }
}
