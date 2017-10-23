import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Event } from '../../models/event';
import { Category } from '../../models/category';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  title: string;
  eventSource: Event[] = [];
  calendarMode: string = 'day';
  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  step: number = 15;
  lockSwipeToPrev = false;
  dateFormatter = {
    formatDayViewTitle: (date: Date) => {
      return `${date.toLocaleString('en-us', { month: 'long' })} ${date.getDate()}`;
    }
  };

  eventsObservable: FirebaseListObservable<any[]>;
  events: Event[] = [];
  categories: Category[] = [
    { name: 'Sports', selected: true },
    { name: 'Religion', selected: true },
    { name: 'LGBT', selected: true },
    { name: 'Live Music', selected: true },
    { name: 'Performing Arts', selected: true },
    { name: 'Visual Arts', selected: true },
    { name: 'Children', selected: true },
    { name: 'Fitness', selected: true },
    { name: 'Literature', selected: true },
    { name: 'Aerospace', selected: true },
    { name: 'History', selected: true },
    { name: 'DJs', selected: true },
    { name: 'Karaoke', selected: true },
    { name: 'Parks & Recreation', selected: true },
    { name: 'Libraries', selected: true },
    { name: 'Festivals/Fairs', selected: true }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public afDB: AngularFireDatabase) {

    this.eventsObservable = this.afDB.list('/events');

    this.eventsObservable.subscribe(records => {
      this.events = records.map(record => ({
        id: record.$key,
        organizerId: record.ownerId,
        title: record.title,
        startTime: new Date(record.startTime),
        endTime: new Date(record.endTime),
        allDay: record.allDay,
        category: record.category,
        subCategory: record.subCategory,
        location: record.location,
        description: record.description,
        imageUrl: record.imageUrl
      }));

      this.applyFilter();
    });
  }

  applyFilter() {
    this.eventSource = this.events.filter(event => {
      const category = this.categories.find(category => category.name === event.category);
      return category
        ? category.selected
        : true;
    });
  }

  addEvent() {
    let modal = this.modalCtrl.create('AddEventPage');

    modal.onDidDismiss(data => {
      if (!data) return;

      this.eventsObservable.push(data);
    });

    modal.present();
  }

  showFilters() {
    let modal = this.modalCtrl.create('FiltersPage', this.categories);

    modal.onDidDismiss(() => {
      this.applyFilter();
    });

    modal.present();
  }

  calcSwipe(date: Date) {
    /*var today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (this.calendarMode === 'day') {
      if (date <= today) {
        this.lockSwipeToPrev = true;
      } else {
        this.lockSwipeToPrev = false;
      }
    } else {
      this.lockSwipeToPrev = false;
    }*/
  }

  onTimeSelected(ev: { selectedTime: Date, events: any[] }) {
    this.calcSwipe(ev.selectedTime);
  }

  onTitleChanged(title: string) {
    this.title = title;
  }

  onEventSelected(event: Event) {
    this.navCtrl.push('EventPage', event);
  }

  onCurrentDateChanged(date: Date) {
    this.selectedDate = date;

    this.calcSwipe(date);
  }

  markDisabled(date: Date) {
    var current = new Date();
    current.setHours(0, 0, 0, 0);
    return date < current;
  };
}
