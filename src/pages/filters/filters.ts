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

  selectAll() {
    this.categories.forEach(category => category.selected = true);
  }

  unselectAll() {
    this.categories.forEach(category => category.selected = false);
  }

  done() {
    this.viewCtrl.dismiss();
  }
}
