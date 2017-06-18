import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    NgCalendarModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule { }
