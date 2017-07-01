import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Event } from '../../models/event';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  title: string;
  eventSource: Array<Event> = [];
  calendarMode: string = 'day';
  currentDate: Date = new Date();
  events: FirebaseListObservable<Array<any>>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public afDB: AngularFireDatabase) {
    this.events = this.afDB.list('/events');

    this.events.subscribe(events => {
      this.eventSource = [];

      events.forEach(event => {
        let calendarEvent = {
          id: event.$key,
          title: event.title,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
          allDay: event.allDay,
          category: event.category
        };

        if (calendarEvent.endTime < new Date())
          return this.events.remove(calendarEvent.id);

        this.eventSource.push(calendarEvent);
      });
    }, console.error);
  }

  generateRandomEvents() {
    this.eventSource.forEach(event => {
      this.events.remove(event.id);
    });

    const events = [];
    for (let i = 0; i < 50; i++) {
      const date = new Date();
      const startDay = Math.floor(Math.random() * 30) - 15;
      const endDay = Math.floor(Math.random() * 2) + startDay;

      if (Math.floor(Math.random() * 2) === 0) {
        events.push({
          title: `All Day - ${i}`,
          startTime: new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay).toString(),
          endTime: new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay === startDay ? endDay + 1 : endDay).toString(),
          allDay: true,
          category: 'Stuff'
        });
      } else {
        const startMinute = Math.floor(Math.random() * 24 * 60);
        const endMinute = Math.floor(Math.random() * 180) + startMinute;

        events.push({
          title: `Event - ${i}`,
          startTime: new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute).toString(),
          endTime: new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute).toString(),
          allDay: false,
          category: 'Things'
        });
      }
    }

    events.forEach(event => {
      this.events.push(event);
    });
  }

  addEvent() {
    let modal = this.modalCtrl.create('AddEventPage');

    modal.onDidDismiss(data => {
      if (!data)
        return;

      // this.events.push(data);
      console.log(data);
    });

    modal.present();
  }

  onTitleChanged(title: string) {
    this.title = title;
  }

  onEventSelected(event: Event) {
    this.navCtrl.push('EventPage', event);
  }
}
