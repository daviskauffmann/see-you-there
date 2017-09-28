import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EfscPage } from './efsc';

import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    EfscPage,
  ],
  imports: [
    IonicPageModule.forChild(EfscPage),
    NgCalendarModule
  ],
  exports: [
    EfscPage
  ]
})
export class EfscPageModule {}
