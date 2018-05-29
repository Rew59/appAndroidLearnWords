import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Injectable()
export class NetworkService {
  isNetworkOnline:boolean;

  constructor(
    public network: Network,
    public toastCtrl: ToastController
  ) {
    
        if(this.network.type == "wifi" || this.network.type == "3g" || this.network.type == "4g"){
            this.isNetworkOnline = true;
        }else this.isNetworkOnline = false;
    
        this.network.onConnect().subscribe(() => {
          if(this.network.type == "wifi" || "3g" || "4g"){
            this.isNetworkOnline = true;
            
          }
        });
        this.network.onDisconnect().subscribe(() => {
          this.isNetworkOnline = false;
          this.toastCtrl.create({
            message: 'Подключение к интернету отсутствует',
            duration: 1000,
            position: 'middle'
          }).present();
        });

      

  }


}