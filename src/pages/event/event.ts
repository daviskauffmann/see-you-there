import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  event: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
      this.event = this.navParams.data;
  }
}
