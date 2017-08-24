import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Owner } from '../../models/owner';

@IonicPage()
@Component({
  selector: 'page-featured',
  templateUrl: 'featured.html',
})
export class FeaturedPage {
  owners: Owner[] = [
    {
      id: '0',
      name: 'Thing',
      bio: 'Stuff',
      imageUrl: 'http://lorempixel.com/400/200/'
    },
    {
      id: '1',
      name: 'Thing',
      bio: 'Stuff',
      imageUrl: 'http://lorempixel.com/400/200/'
    },
    {
      id: '2',
      name: 'Thing',
      bio: 'Stuff',
      imageUrl: 'http://lorempixel.com/400/200/'
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
}
