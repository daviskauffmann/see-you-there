import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  email: string = 'test@test.com';
  password: string = 'testing';
  error: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  signIn(): void {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        console.log(res);

        this.navCtrl.setRoot('HomePage', {}, {
          animate: true,
          direction: 'forward'
        })
          .then(console.log)
          .catch(console.error);
      })
      .catch(err => {
        console.error(err);

        this.error = err.message;
      });
  }

  signUp(): void {
    this.navCtrl.setRoot('SignUpPage', {
      email: this.email,
      password: this.password
    }, {
      animate: true,
      direction: 'forward'
    })
      .then(console.log)
      .catch(console.error);
  }

  forgotPassword(): void {
    this.afAuth.auth.sendPasswordResetEmail(this.email)
      .then(console.log)
      .catch(err => {
        console.error(err);

        this.error = err.message;
      });
  }

  signInWithGoogle(): void {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(console.log)
      .catch(console.error);
  }

  signInWithFacebook(): void {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(console.log)
      .catch(console.error);
  }

  signInWithTwitter(): void {
    this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider())
      .then(console.log)
      .catch(console.error);
  }
}
