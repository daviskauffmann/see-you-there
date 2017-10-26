import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { EventsProvider } from '../../providers/events/events';

import { Event } from '../../models/event';

@IonicPage()
@Component({
  selector: 'page-efsc',
  templateUrl: 'efsc.html',
})
export class EfscPage {
  title: string = 'EFSC Events';
  calendarMode: string = 'day';
  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  step: number = 15;
  lockSwipeToPrev = false;
  dateFormatter = {
    formatDayViewTitle: (date: Date) => {
      return `${date.toLocaleString('en-us', { month: 'long' })}`;
    }
  };
  weekday: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public events: EventsProvider) { }

  addEvent() {
    let modal = this.modalCtrl.create('AddEventPage');

    modal.onDidDismiss(data => {
      if (!data) return;

      this.events.addEvent(data);
    });

    modal.present();
  }

  showFilters() {
    let modal = this.modalCtrl.create('FiltersPage');

    modal.present();
  }

  onTitleChanged(title: string) {
    this.title = title;
  }

  onEventSelected(event: Event) {
    this.navCtrl.push('EventPage', event);
  }

  onCurrentDateChanged(date: Date) {
    this.selectedDate = date;

    switch (date.getDay()) {
      case 0: this.weekday = 'sun'; break;
      case 1: this.weekday = 'm'; break;
      case 2: this.weekday = 't'; break;
      case 3: this.weekday = 'w'; break;
      case 4: this.weekday = 'r'; break;
      case 5: this.weekday = 'f'; break;
      case 6: this.weekday = 'sat'; break;
    }
  }

  getWeekday() {
    const today = this.selectedDate;
    const day = today.getDay();

    return {
      sunday: new Date(today.getFullYear(), today.getMonth(), today.getDate() - day).getDate(),
      monday: new Date(today.getFullYear(), today.getMonth(), today.getDate() - day + 1).getDate(),
      tuesday: new Date(today.getFullYear(), today.getMonth(), today.getDate() - day + 2).getDate(),
      wednesday: new Date(today.getFullYear(), today.getMonth(), today.getDate() - day + 3).getDate(),
      thursday: new Date(today.getFullYear(), today.getMonth(), today.getDate() - day + 4).getDate(),
      friday: new Date(today.getFullYear(), today.getMonth(), today.getDate() - day + 5).getDate(),
      saturday: new Date(today.getFullYear(), today.getMonth(), today.getDate() - day + 6).getDate(),
    };
  }
}
