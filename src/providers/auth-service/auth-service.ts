import { Injectable } from '@angular/core';
//import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthServiceProvider {
  //isLoggedIn: Boolean;
  user: Observable<firebase.User>; //Ссылка на юзера

  constructor(/*public navCtrl: NavController,
    public navParams: NavParams, */
    private afAuth: AngularFireAuth
  ) {
    
    this.user = this.afAuth.authState;


  }

  signOut(){
    return this.afAuth.auth.signOut().then(()=> {
      // Sign-out successful.
      return true;
    }).catch(function(error) {
      // An error happened.
      return error;
    });
  }

}
