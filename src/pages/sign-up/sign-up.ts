import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, TextInput, } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  @ViewChild('focusInput') focusInput: TextInput;

  displayName: string;
  email: string;
  password: string;
  password2: string;
  error: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth) {

    this.email = this.navParams.data.email;
    this.password = this.navParams.data.password;
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.focusInput.setFocus();
    }, 500);
  }

  signUp() {
    if (!this.email)
      return this.error = 'Email required';

    if (!this.password)
      return this.error = 'Password required';

    if (this.password !== this.password2)
      return this.error = 'Passwords don\'t match';

    let loader = this.loadingCtrl.create({
      content: 'Creating'
    });
    loader.present();

    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then((user: User) => {
      loader.dismiss();

      user.updateProfile({
        displayName: this.displayName,
        photoURL: ''
      });
      user.sendEmailVerification();

      this.navCtrl.setRoot('HomePage', {}, {
        animate: true,
        direction: 'forward'
      });
    }).catch(err => {
      loader.dismiss();

      this.error = err.message;
    });
  }

  cancel() {
    this.navCtrl.setRoot('SignInPage', {}, {
      animate: true,
      direction: 'back'
    });
  }
}
