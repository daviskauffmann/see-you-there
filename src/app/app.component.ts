import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'SignInPage';
  search: string = '';

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public afAuth: AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.afAuth.auth.onAuthStateChanged((user: User) => {
      if (user) {
        this.rootPage = 'HomePage';
      }
    });
  }

  updateProfile(): void {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: '',
      photoURL: ''
    });
  }

  updateEmail(): void {
    this.afAuth.auth.currentUser.updateEmail('');
  }

  updatePassword(): void {
    this.afAuth.auth.currentUser.updatePassword('');
  }

  resendVerification(): void {
    if (!this.afAuth.auth.currentUser.emailVerified) {
      this.afAuth.auth.currentUser.sendEmailVerification();
    }
  }

  signOut(): void {
    this.afAuth.auth.signOut()
      .then(() => {
        this.nav.setRoot('SignInPage', {}, {
          animate: true,
          direction: 'back'
        });
      });
  }
}
