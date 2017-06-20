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

  signIn(): void {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.navCtrl.setRoot('HomePage', {}, {
          animate: true,
          direction: 'forward'
        });
      })
      .catch((err: Error) => {
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
    });
  }

  forgotPassword(): void {
    this.afAuth.auth.sendPasswordResetEmail(this.email)
      .catch((err: Error) => {
        this.error = err.message;
      });
  }

  signInWithPhone(): void {
    this.afAuth.auth.signInWithPhoneNumber('', new auth.RecaptchaVerifier(''));
  }

  signInWithGoogle(): void {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  signInWithFacebook(): void {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  signInWithTwitter(): void {
    this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
  }
}
