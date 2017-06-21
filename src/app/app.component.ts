import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase/app';

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
    public alertCtrl: AlertController,
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

  upgradeAccount(): void {
    this.alertCtrl.create({
      title: 'Upgrade Account',
      inputs: [{
        name: 'displayName',
        placeholder: 'Display Name',
        type: 'text',
        value: 'Test'
      }, {
        name: 'email',
        placeholder: 'Email',
        type: 'email',
        value: 'test@test.com'
      }, {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        value: 'testing'
      }, {
        name: 'password2',
        placeholder: 'Confirm Password',
        type: 'password',
        value: 'testing'
      }],
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Ok',
        handler: (data: any) => {
          if (!data.displayName) {
            return;
          }

          if (!data.email) {
            return;
          }

          if (!data.password) {
            return;
          }

          if (data.password !== data.password2) {
            return;
          }

          this.afAuth.auth.currentUser.linkWithCredential(auth.EmailAuthProvider.credential(data.email, data.password)).then((user: User) => {
            user.updateProfile({
              displayName: data.displayName,
              photoURL: ''
            });
            user.sendEmailVerification();
          });
        }
      }]
    }).present();
  }

  updateProfile(): void {
    this.alertCtrl.create({
      title: 'Update Profile',
      inputs: [{
        name: 'displayName',
        placeholder: 'Display Name',
        type: 'text'
      }, {
        name: 'photoURL',
        placeholder: 'Photo URL',
        type: 'text'
      }],
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Ok',
        handler: (data: any) => {
          this.afAuth.auth.currentUser.updateProfile({
            displayName: data.displayName,
            photoURL: data.photoURL
          });
        }
      }]
    }).present();
  }

  updateEmail(): void {
    this.alertCtrl.create({
      title: 'Update Email',
      inputs: [{
        name: 'email',
        placeholder: 'Email',
        type: 'email'
      }],
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Ok',
        handler: (data: any) => {
          this.afAuth.auth.currentUser.updateEmail(data.email);
        }
      }]
    }).present();
  }

  updatePassword(): void {
    this.alertCtrl.create({
      title: 'Update Password',
      inputs: [{
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }, {
        name: 'password2',
        placeholder: 'Confirm Password',
        type: 'password'
      }],
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Ok',
        handler: (data: any) => {
          if (data.password !== data.password2) {
            return;
          }

          this.afAuth.auth.currentUser.updatePassword(data.password);
        }
      }]
    }).present();
  }

  resendVerification(): void {
    if (!this.afAuth.auth.currentUser.emailVerified) {
      this.afAuth.auth.currentUser.sendEmailVerification();
    }
  }

  deleteAccount(): void {
    this.afAuth.auth.currentUser.delete().then(() => {
      this.nav.setRoot('SignInPage', {}, {
        animate: true,
        direction: 'back'
      });
    });
  }

  signOut(): void {
    this.afAuth.auth.signOut().then(() => {
      this.nav.setRoot('SignInPage', {}, {
        animate: true,
        direction: 'back'
      });
    });
  }
}
