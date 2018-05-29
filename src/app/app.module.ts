import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { NetworkService } from '../providers/auth-service/network-service';

import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';
//import { AndroidFullScreen } from '@ionic-native/android-full-screen';
//import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    Network,
    NetworkService
  ]
})
export class AppModule {}
