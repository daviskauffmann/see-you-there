import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Event } from '../../models/event';
import { Category } from '../../models/category';
import { Organizer } from '../../models/organizer';

@Injectable()
export class EventsProvider {
  eventfulBaseUri: string = 'http://api.eventful.com';
  eventfulEndpoint: string = 'json/events/search';
  eventfulApiKey: string = 'Hv6xjmqzhvghMKB2';

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
    { name: 'Festivals/Fairs', selected: true },
    { name: 'Discussion', selected: true }
  ];

  organizersObservable: FirebaseListObservable<any[]>;
  organizers: Organizer[] = [];

  constructor(
    public afDB: AngularFireDatabase,
    public http: Http
  ) {
    this.eventsObservable = this.afDB.list('/events');
    this.organizersObservable = this.afDB.list('/organizer');

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
    });

    this.organizersObservable.subscribe(records => {
      this.organizers = records.map(record => record);
    });

    // const req = `${this.eventfulBaseUri}/${this.eventfulEndpoint}?` +
    //   `date=Future&` +
    //   `change_multi_day_start=true` +
    //   `location=Melbourne,FL&` +
    //   `page_size=250&` +
    //   `app_key=${this.eventfulApiKey}`;
    // this.http.get(req)
    //   .map(res => res.json())
    //   .subscribe(res => {
    //     console.log(res);

    //     this.events = res.events.event.map((event: any) => ({
    //       id: event.id,
    //       organizerId: event.owner,
    //       title: event.title,
    //       startTime: event.start_time ? new Date(event.start_time) : new Date(),
    //       endTime: event.stop_time ? new Date(event.stop_time) : new Date(),
    //       allDay: false,
    //       category: '',
    //       subCategory: '',
    //       location: {
    //         name: event.venue_name,
    //         address: event.venue_address,
    //         description: ''
    //       },
    //       description: event.description,
    //       imageUrl: event.image && event.image.url
    //     }));

    //     console.log(this.events);
    //   });
  }

  getEvents(category?: string, organizerId?: string) {
    return this.events.filter(event => {
      if (category && event.category !== category) {
        return false;
      }

      if (organizerId && event.organizerId !== organizerId) {
        return false;
      }

      return true;
    });
  }

  getFilteredEvents() {
    return this.events
      .filter(event => {
        const category = this.categories.find(category => category.name === event.category);

        return category ? category.selected : true;
      });
  }

  addEvent(event: Event) {
    this.eventsObservable.push(event);
  }

  getCategories() {
    return this.categories.sort((a, b) =>
      a.name < b.name
        ? -1
        : a.name > b.name
          ? 1
          : 0);
  }
}
