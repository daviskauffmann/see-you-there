import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  name: string = '';
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
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp(): void {
    if (!this.name) {
      this.error = 'Name required';
      return;
    }

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

    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((res: User) => {
        console.log(res);

        res.sendEmailVerification()
          .then(console.log)
          .catch(console.error);

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

  cancel(): void {
    this.navCtrl.setRoot('SignInPage', {}, {
      animate: true,
      direction: 'back'
    })
      .then(console.log)
      .catch(console.error);
  }
}
