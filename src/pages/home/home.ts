import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { EventsProvider } from '../../providers/events/events';

import { Event } from '../../models/event';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  title: string;
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
  }
}
