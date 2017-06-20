import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
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
    public alertCtrl: AlertController,
    public afAuth: AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.afAuth.auth.onAuthStateChanged((user: User) => {
      console.log(user);
      if (user) {
        this.rootPage = 'HomePage';
      }
    });
  }

  updateProfile(): void {
    this.alertCtrl.create({
      title: 'Update Profile',
      inputs: [
        {
          name: 'displayName',
          placeholder: 'Display Name'
        },
        {
          name: 'photoURL',
          placeholder: 'Photo URL'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok',
          handler: data => {
            this.afAuth.auth.currentUser.updateProfile({
              displayName: data.displayName,
              photoURL: data.photoURL
            });
          }
        }
      ]
    }).present();
  }

  updateEmail(): void {
    this.alertCtrl.create({
      title: 'Update Email',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok',
          handler: data => {
            this.afAuth.auth.currentUser.updateEmail(data.email);
          }
        }
      ]
    }).present();
  }

  updatePassword(): void {
    this.alertCtrl.create({
      title: 'Update Password',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password'
        },
        {
          name: 'password2',
          placeholder: 'Confirm Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok',
          handler: data => {
            if (data.password !== data.password2) {
              return;
            }
            
            this.afAuth.auth.currentUser.updatePassword(data.password);
          }
        }
      ]
    }).present();
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
