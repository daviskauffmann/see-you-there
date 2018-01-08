import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { NgCalendarModule } from 'ionic2-calendar';
import { EventsProvider } from '../providers/events/events';

export const firebaseConfig = {
  apiKey: 'AIzaSyA9ZgbQGxGF6ZZ__gXz5tUdAhdSYQn2GN0',
  authDomain: 'see-you-827f6.firebaseapp.com',
  databaseURL: 'https://see-you-827f6.firebaseio.com',
  projectId: 'see-you-827f6',
  storageBucket: 'see-you-827f6.appspot.com',
  messagingSenderId: '1089579837851'
};

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EventsProvider
  ]
})
export class AppModule { }
