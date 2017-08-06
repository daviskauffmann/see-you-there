import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, TextInput } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  @ViewChild('focusInput') focusInput: TextInput;

  email: string = 'test@test.com';
  password: string = 'testing';
  error: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth) { }

  ionViewDidLoad() {
    setTimeout(() => {
      this.focusInput.setFocus();
    }, 500);
  }

  signIn() {
    let loader = this.loadingCtrl.create({
      content: 'Authenticating'
    });
    loader.present();

    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        loader.dismiss();

        this.navCtrl.setRoot('HomePage', {}, {
          animate: true,
          direction: 'forward'
        });
      })
      .catch(err => {
        loader.dismiss();

        this.error = err.message;
      });
  }

  signInAnonymously() {
    let loader = this.loadingCtrl.create({
      content: 'Authenticating'
    });
    loader.present();

    this.afAuth.auth.signInAnonymously()
      .then(() => {
        loader.dismiss();

        this.navCtrl.setRoot('HomePage', {}, {
          animate: true,
          direction: 'forward'
        });
      })
      .catch(err => {
        loader.dismiss();

        this.error = err.message;
      });
  }

  signUp() {
    this.navCtrl.setRoot('SignUpPage', {
      email: this.email,
      password: this.password
    }, {
        animate: true,
        direction: 'forward'
      });
  }

  forgotPassword() {
    this.afAuth.auth.sendPasswordResetEmail(this.email)
      .catch(err => {
        this.error = err.message;
      });
  }

  signInWithPhoneNumber() {
    this.afAuth.auth.signInWithPhoneNumber('', new auth.RecaptchaVerifier(''));
  }

  signInWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  signInWithFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  signInWithTwitter() {
    this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
  }
}
