import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Event } from '../../models/event';
import { Geolocation } from '@ionic-native/geolocation';
// needed to access google API for geocoding
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { GESTURE_PRIORITY_TOGGLE } from 'ionic-angular/gestures/gesture-controller';

// hack to prevent TypeScript errors
declare var geocoder: any;
declare var google: any;
declare var map: any;

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  event: Event;
  geoWatch: any;
  mapMarker: any;
  position: any = { lat: 0.0, lng: 0.0 };
  has_pos: boolean;

  pat_lat: number = 28.169163;
  pat_lng: number = -80.646708;

  geocodeURI: string = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  google_key: string = '&key=AIzaSyACIn956WI7_FAS0cZwxHeqod_aK02FzcU';
  geoURI: string;
  navURI: string;

  constructor(
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation) {

      // assign data carried over from firebase
      this.event = this.navParams.data;
      // this.RegisterPositionCallback(geolocation);
      console.log(JSON.stringify(this.event));
      // build map URI
      this.geoURI = this.geocodeURI 
        + this.event.location.address.replace(/ /g, '+') 
        + this.google_key;
      // build nav URI
      this.navURI = 'http://maps.google.com/maps?daddr=' + this.event.location.address;
  }

  ionViewDidLoad() {
    // hook geocode response
    this.http.get(this.geoURI).map(res => res.json()).subscribe(
      (data) => {
        console.log(JSON.stringify(data));
        if (data.status == 'OK') {
          let loc = data.results[0].geometry.location;
          console.log('ionViewDidLoad():loc = ' + JSON.stringify(loc));
          this.position.lat = loc.lat;
          this.position.lng = loc.lng;
          this.loadMap();
        } else {
          this.position.lat = this.pat_lat;
          this.position.lng = this.pat_lng;
          console.log('Error during geocoding');
          this.loadMap();
        }
      }, (error) => {
        console.log('geocoding[' + error.code + '] ' + error.message);
        this.position.lat = this.pat_lat;
        this.position.lng = this.pat_lng;
        this.loadMap();
      }
    );
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave() in pages/event/event.ts');
    // deregister callbacks
    // this.geoWatch.unsubscribe();
  }

  loadMap() {
    console.log('loadMap() in pages/event/event.ts');
    // construct settings object
    let latLng = new google.maps.LatLng(this.position.lat, this.position.lng);
    let mapOptions = {
      center: latLng,
      zoom: 10,
      animation: google.maps.Animation.DROP
    };
    // build map using api
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.mapMarker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: this.event.location.name
    });

    this.mapMarker.addListener('click', () => {

    });
  }

  RegisterPositionCallback(geolocation: Geolocation) {
    this.geoWatch = geolocation.watchPosition();
    this.geoWatch.subscribe(this.WatchPositionCallback);
  }

  WatchPositionCallback(data: any) {
    if (data.coords) {

    }
  }
}
