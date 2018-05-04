import { Component } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
// import { auth, User } from 'firebase/app';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  root: any = 'SplashPage';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public afAuth: AngularFireAuth) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      // splashScreen.hide();
      let config = {
        apiKey: 'AIzaSyA9ZgbQGxGF6ZZ__gXz5tUdAhdSYQn2GN0',
        authDomain: 'see-you-827f6.firebaseapp.com',
        databaseURL: 'https://see-you-827f6.firebaseio.com',
        projectId: 'see-you-827f6',
        storageBucket: 'see-you-827f6.appspot.com',
        messagingSenderId: '1089579837851'
      };
      firebase.initializeApp(config);
    });
  }

  signIn() {
    this.alertCtrl.create({
      title: 'Sign Up',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email',
          value: 'test@test.com'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          value: 'testing'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok',
          handler: data => {
            this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password);
          }
        }
      ]
    }).present();
  }

  signUp() {
    this.alertCtrl.create({
      title: 'Sign Up',
      inputs: [
        {
          name: 'displayName',
          placeholder: 'Display Name',
          type: 'text',
          value: 'Test'
        },
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email',
          value: 'test@test.com'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          value: 'testing'
        },
        {
          name: 'password2',
          placeholder: 'Confirm Password',
          type: 'password',
          value: 'testing'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok',
          handler: data => {
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

            this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
              .then((user: firebase.User) => {
                user.updateProfile({
                  displayName: data.displayName,
                  photoURL: ''
                });
                user.sendEmailVerification();
              });
          }
        }
      ]
    }).present();
  }

  upgradeAccount() {
    this.alertCtrl.create({
      title: 'Upgrade Account',
      inputs: [
        {
          name: 'displayName',
          placeholder: 'Display Name',
          type: 'text',
          value: 'Test'
        },
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email',
          value: 'test@test.com'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          value: 'testing'
        },
        {
          name: 'password2',
          placeholder: 'Confirm Password',
          type: 'password',
          value: 'testing'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok',
          handler: data => {
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

            this.afAuth.auth.currentUser.linkWithCredential(firebase.auth.EmailAuthProvider.credential(data.email, data.password))
              .then((user: firebase.User) => {
                user.updateProfile({
                  displayName: data.displayName,
                  photoURL: ''
                });
                user.sendEmailVerification();
              });
          }
        }
      ]
    }).present();
  }

  updateProfile() {
    this.alertCtrl.create({
      title: 'Update Profile',
      inputs: [
        {
          name: 'displayName',
          placeholder: 'Display Name',
          type: 'text',
          value: this.afAuth.auth.currentUser.displayName
        },
        {
          name: 'photoURL',
          placeholder: 'Photo URL',
          type: 'text',
          value: this.afAuth.auth.currentUser.photoURL
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

  updateEmail() {
    this.alertCtrl.create({
      title: 'Update Email',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email',
          value: this.afAuth.auth.currentUser.email
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

  updatePassword() {
    this.alertCtrl.create({
      title: 'Update Password',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
        {
          name: 'password2',
          placeholder: 'Confirm Password',
          type: 'password'
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

  resendVerification() {
    if (!this.afAuth.auth.currentUser.emailVerified) {
      this.afAuth.auth.currentUser.sendEmailVerification();
    }
  }

  deleteAccount() {
    this.alertCtrl.create({
      title: 'Delete Account',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.afAuth.auth.currentUser.delete();
          }
        }
      ]
    }).present();
  }

  signOut() {
    this.alertCtrl.create({
      title: 'Sign Out',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.afAuth.auth.signOut();
          }
        }
      ]
    }).present();
  }
}
