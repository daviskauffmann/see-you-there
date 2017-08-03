import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Category } from '../../models/category';

@IonicPage()
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {
  categories: Category[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.categories = this.navParams.data;
  }

  done() {
    this.viewCtrl.dismiss();
  }

  getToggleText() {
    return this.categories.every(category => category.selected)
      ? 'Unselect All'
      : 'Select All';
  }

  toggle() {
    if (this.categories.every(category => category.selected)) {
      this.categories.forEach(category => category.selected = false);
    } else {
      this.categories.forEach(category => category.selected = true);
    }
  }
}
