import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  title: string = '';
  eventSource: Array<any> = [];
  calendarMode: string = 'day';
  currentDate: Date = new Date();
  events: FirebaseListObservable<Array<any>>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase) {
    this.events = this.afDB.list('/events');

    this.events.subscribe((events: Array<any>) => {
      this.eventSource = [];

      events.forEach((event: any) => {
        // Events are stored in Firebase as strings.
        // So they must be converted to dates before use in the calendar.
        event.startTime = new Date(event.startTime);
        event.endTime = new Date(event.endTime);
        this.eventSource.push(event);
      });
    }, console.error);
  }

  generateRandomEvents(): void {
    this.eventSource.forEach((event: any) => {
      this.events.remove(event.$key);
    });

    const events: Array<any> = [];
    for (var i = 0; i < 50; i++) {
      const date: Date = new Date();
      const eventType: number = Math.floor(Math.random() * 2);
      const startDay: number = Math.floor(Math.random() * 90) - 45;
      const endDay: number = Math.floor(Math.random() * 2) + startDay;

      let event: any;
      if (eventType === 0) {
        event = {
          title: `All Day - ${i}`,
          startTime: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay)).toString(),
          endTime: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay === startDay ? endDay + 1 : endDay)).toString(),
          allDay: true,
          category: 'Stuff'
        };
      } else {
        const startMinute: number = Math.floor(Math.random() * 24 * 60);
        const endMinute: number = Math.floor(Math.random() * 180) + startMinute;

        event = {
          title: `Event - ${i}`,
          startTime: new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute).toString(),
          endTime: new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute).toString(),
          allDay: false,
          category: 'Things'
        };
      }

      events.push(event);
    }

    events.forEach((event: any) => {
      this.events.push(event);
    });
  }

  onCurrentDateChanged(ev: any): void {

  }

  reloadSource(startTime: Date, endTime: Date): void {

  }

  onTitleChanged(title: string): void {
    this.title = title;
  }

  onEventSelected(ev: any): void {
    console.log(ev);
  }

  onTimeSelected(ev: any): void {

  }
}
