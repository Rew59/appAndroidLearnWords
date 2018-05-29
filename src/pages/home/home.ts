import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';

//import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NetworkService } from '../../providers/auth-service/network-service';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  themes: Observable<any[]>;
  isOnline:boolean;
  themesStorage: Promise<any[]>;
  userId:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private AuthS: AuthServiceProvider,
    private db: AngularFireDatabase,
    private storage: Storage,
    public network: NetworkService,
    public toastCtrl: ToastController
  ) {
    this.isOnline = this.network.isNetworkOnline;

    this.AuthS.user.subscribe(
      (user)=>{
        if(!user){
          this.navCtrl.setRoot('LoginPage');
        }else{
          this.userId = user.uid;

          //if(this.isOnline){
            this.themes = db.list('users/'+ user.uid + '/themes').snapshotChanges()
            .map(
              data=>{
                let resultArr = [];
                for(let theme of data){
                  let obj = {
                    key: '',
                    val:''
                  }
      
                  obj.key = theme.key;
                  obj.val = theme.payload.val().theme;
                  resultArr.push(obj);
                }
                return resultArr;
              }
            );
         // }else{
            
            this.storage.get('themes').then(val=>{
              this.themesStorage = val;console.log(val);
            });
          //}
          
        }
      }
    );
  }

  ionViewWillEnter(){
    
  }

  openTheme(keyTheme){
    this.navCtrl.push('WorksPage', {
      key: keyTheme
    });
  }

  exit(){
      this.AuthS.signOut().then(
        ()=> this.navCtrl.setRoot('LoginPage')
      ).catch(
        (err)=>{
          this.toastCtrl.create({
            message: 'При выходе произошла ошибка '+err,
            duration: 3000,
            position: 'middle'
          }).present();
        }
      )
  }
  

  loadData(){
        let resultArr = [];
      //Создание объекта с темамами, ключами к nameWord и translationWord из БД
        this.themes/*.map(
          val=>{
            for(let theme of val){
              let obj = {
                key: '',
                val:''
              }
  
              obj.key = theme.key;
              obj.val = theme.payload.val().theme;

              resultArr.push(obj);
            }
            //console.log(result);
            return resultArr;
          }
        )*/.subscribe(
          val=>{
            
            this.storage.set('themes',val)/*.then(
              par=>{//console.log(par);
                this.toastCtrl.create({
                  message: 'Данные успешно сохранены локально',
                  duration: 3000,
                  position: 'middle'
                }).present();
              }
            )*/.catch(e=>{
              this.toastCtrl.create({
                message: 'Произошла ошибка при сохранении данных',
                duration: 3000,
                position: 'middle'
              }).present();
            });
            
          }
        );
        
        this.db.list('/users/'+this.userId+'/words').snapshotChanges().map(
          data=>{
            let resultArr = [];
            for(let words of data){
              let obj = {
                key: '',
                words:[]
              }
  
              obj.key = words.key;
              let value = words.payload.val();
              for(let a in value){
                let objWords = {
                  nameWord: '',
                  translationWord: []
                }
                objWords.nameWord = value[a].nameWord;

                for(let b in value[a]){
                  if(value[a][b].translationWord){
                    objWords.translationWord.push(value[a][b].translationWord);
                  }
                  //console.log(a[b]);
                }
                obj.words.push(objWords);
              }
              resultArr.push(obj);
            }
            return resultArr;
          }
        ).subscribe(
          val=>{
            this.storage.set('words',val).then(
              par=>{//console.log(par);
                this.toastCtrl.create({
                  message: 'Данные успешно сохранены локально',
                  duration: 3000,
                  position: 'middle'
                }).present();
              }
            ).catch(e=>{
              this.toastCtrl.create({
                message: 'Произошла ошибка при сохранении данных',
                duration: 3000,
                position: 'middle'
              }).present();
            });
          }
        )

    }
    

}
