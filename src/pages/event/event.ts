import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Event } from '../../models/event';

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  event: Event;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.event = this.navParams.data;

    console.log(this.event);
  }
}
