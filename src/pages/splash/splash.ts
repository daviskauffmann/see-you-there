import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public splashScreen: SplashScreen
  ) { }

  ionViewDidEnter() {
    this.splashScreen.hide();

    setTimeout(() => {
      this.navCtrl.push('TabsPage');
    }, 5000);
  }
}
