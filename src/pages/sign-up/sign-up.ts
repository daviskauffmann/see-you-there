import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  @ViewChild('focusInput') focusInput: TextInput;

  displayName: string = '';
  email: string = '';
  password: string = '';
  password2: string = '';
  error: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth) {
    this.email = this.navParams.data.email;
    this.password = this.navParams.data.password;
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.focusInput.setFocus();
    }, 500);
  }

  signUp(): void {
    if (!this.email) {
      this.error = 'Email required';
      return;
    }

    if (!this.password) {
      this.error = 'Password required';
      return;
    }

    if (this.password !== this.password2) {
      this.error = 'Passwords don\'t match';
      return;
    }

    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then((user: User) => {
      user.updateProfile({
        displayName: this.displayName,
        photoURL: ''
      });
      user.sendEmailVerification();

      this.navCtrl.setRoot('HomePage', {}, {
        animate: true,
        direction: 'forward'
      });
    }).catch((err: Error) => {
      this.error = err.message;
    });
  }

  cancel(): void {
    this.navCtrl.setRoot('SignInPage', {}, {
      animate: true,
      direction: 'back'
    });
  }
}
