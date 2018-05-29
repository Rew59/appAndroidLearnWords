import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NetworkService } from '../../providers/auth-service/network-service';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-works',
  templateUrl: 'works.html',
})
export class WorksPage {
  @ViewChild(Slides) slides: Slides;

  key:string;
  isTranslationWord:Boolean = false;
  isOnline:boolean;
  countSlides:number = 0;
  currentSlide:number = 0;

  words: Observable<any[]>;
  wordsStorage: Promise<any>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private AuthS: AuthServiceProvider,
    private db: AngularFireDatabase,
    public network: NetworkService,
    private storage: Storage
  ) {
    this.key = navParams.get('key');
    this.isOnline = this.network.isNetworkOnline;
    //this.countSlides = this.slides.length();

    this.AuthS.user.subscribe(
      (user)=>{
        if(!user){
          this.navCtrl.setRoot('LoginPage');
        }else{
          
          if(this.isOnline){
            this.words = db.list('/users/'+user.uid+'/words/'+this.key).valueChanges().map(data => {
              let result = [];
              for(let a of data){
                
                let obj = {
                  nameWord: '',
                  translationWord: []
                }
  
                obj.nameWord = a['nameWord'];
                for(let b in a){
                  if(a[b].translationWord){
                    obj.translationWord.push(a[b].translationWord);
                  }
                  //console.log(a[b]);
                }
                result.push(obj);
                //console.log(a);
              }
              //console.log(result);
              this.countSlides = result.length;
              return result;
            });
          }else{
            let th = this;
            this.wordsStorage = this.storage.get('words').then(
              val=>{
                for(let i of val){
                  //console.log(this);
                  if(i.key == this.key){
                    let result = [];
                    for(let a of i.words){
                      result.push(a);
                      //console.log(a);
                    }
                    //console.log(result);
                    this.countSlides = result.length;
                    return  result;
                    //break;
                  }
                }

              }
            );
          }
          
          //.subscribe(val=>console.log(val));
        }
      }
    );
  }

  onBackHome(){
    this.navCtrl.setRoot('HomePage');
  }

  clickSlide(){
    this.isTranslationWord ? this.isTranslationWord=false : this.isTranslationWord=true;
    //this.slides.resize();
    //this.slides.update();
  }

  ionViewDidEnter(){
    this.currentSlide = this.slides.getActiveIndex()+1;
    
    //this.countSlides = this.slides.length();
  }

  slideDidChange(){
    if(this.currentSlide < this.countSlides){
      this.currentSlide = this.slides.getActiveIndex()+1;
    }else{
      if(this.slides.isEnd()){
        this.currentSlide = this.countSlides;
      }else this.currentSlide = this.slides.getActiveIndex()+1;
      
    }

    //this.countSlides = this.slides.length();
  }

  slideChanged(){
    this.isTranslationWord=false;
    //this.currentSlide = this.slides.getActiveIndex();
  }

  openFullWindow(){

  }

}
