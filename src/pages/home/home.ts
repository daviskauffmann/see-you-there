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
        event.startTime = new Date(event.startTime);
        event.endTime = new Date(event.endTime);
        this.eventSource.push(event);
      });
    });
  }

  generateRandomEvents(): void {
    this.eventSource.forEach((event: any) => {
      this.events.remove(event.$key);
    });

    const events: Array<any> = [];
    for (var i = 0; i < 50; i++) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;

      if (eventType === 0) {
        if (endDay === startDay) {
          endDay++;
        }

        events.push({
          title: `All Day - ${i}`,
          startTime: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay)).toString(),
          endTime: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay)).toString(),
          allDay: true,
          category: 'Stuff'
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;

        events.push({
          title: `Event - ${i}`,
          startTime: new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute).toString(),
          endTime: new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute).toString(),
          allDay: false,
          category: 'Things'
        });
      }
    }

    events.forEach((event: any) => {
      this.events.push(event);
    });
  }

  onCurrentDateChanged(ev): void {
    
  }

  reloadSource(startTime: Date, endTime: Date): void {
    
  }

  onTitleChanged(title: string): void {
    this.title = title;
  }

  onEventSelected(ev): void {
    console.log(ev);
  }

  onTimeSelected(ev): void {
    
  }
}
