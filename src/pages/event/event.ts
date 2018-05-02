import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Event } from '../../models/event';
import { Geolocation } from '@ionic-native/geolocation';
import { GESTURE_PRIORITY_TOGGLE } from 'ionic-angular/gestures/gesture-controller';

// hack to prevent errors
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  event: Event;
  coords: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation) {

      this.event = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('beans beans beans');
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: false, 
      timeout: 10000, 
      maximumAge: 15000
    }).then((resp) => {
      console.log('got position!');
      this.loadMap(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Geolocation Error[' + error.code + '] ' + error.message);
      this.loadMap(28.254215, -80.713872);
    });
  }

  loadMap(latitude: number, longitude: number) {
    console.log('loadMap()...');
    let latLng = new google.maps.LatLng(latitude, longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      fullscreenControl: false
    });
    // hack to prevent warnings
    console.log(marker);
  }
}
