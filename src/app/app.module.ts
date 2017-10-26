import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
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
  apiKey: 'AIzaSyC313ovfR83k7pQjoBpKf8HFG6_wAQ8nLw',
  authDomain: 'see-you-there-2255a.firebaseapp.com',
  databaseURL: 'https://see-you-there-2255a.firebaseio.com',
  projectId: 'see-you-there-2255a',
  storageBucket: 'see-you-there-2255a.appspot.com',
  messagingSenderId: '1019879395510'
};

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
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
