import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { EventsProvider } from '../../providers/events/events';

@IonicPage()
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public events: EventsProvider) { }

  done() {
    this.viewCtrl.dismiss();
  }

  getToggleText() {
    return this.events.getCategories().every(category => category.selected)
      ? 'Unselect All'
      : 'Select All';
  }

  toggle() {
    if (this.events.getCategories().every(category => category.selected)) {
      this.events.getCategories().forEach(category => category.selected = false);
    } else {
      this.events.getCategories().forEach(category => category.selected = true);
    }
  }
}
