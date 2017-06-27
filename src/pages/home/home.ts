import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Event } from '../../models/event';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  title: string = '';
  eventSource: Array<Event> = [];
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
        this.eventSource.push({
          id: event.$key,
          title: event.title,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
          allDay: event.allDay
        });
      });
    }, console.error);
  }

  generateRandomEvents(): void {
    this.eventSource.forEach((event: Event) => {
      this.events.remove(event.id);
    });

    const events: Array<any> = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime.toString(),
          endTime: endTime.toString(),
          allDay: true,
          category: 'Stuff'
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        events.push({
          title: 'Event - ' + i,
          startTime: startTime.toString(),
          endTime: endTime.toString(),
          allDay: false,
          category: 'Things'
        });
      }
    }

    events.forEach((event: any) => {
      this.events.push(event);
    });
  }

  onTitleChanged(title: string): void {
    this.title = title;
  }

  onEventSelected(event: Event): void {
    this.navCtrl.push('EventPage', event);
  }
}
