import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public AuthS: AuthServiceProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.AuthS.user.subscribe(
        (user)=>{
          if(user){
            this.rootPage = 'HomePage';
          }else{
            this.rootPage = 'LoginPage'
          }
          
        }
      );

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

