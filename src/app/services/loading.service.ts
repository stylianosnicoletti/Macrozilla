import { Injectable } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(public _loadingCtrl: LoadingController) { }

  private loadingOnAppBoot: any;

  async presentLoading(messageText: string, durationMiliSec: number) {
    const loading = await this._loadingCtrl.create({
      message: messageText,
      duration: durationMiliSec
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async createAndPresentLoading(messageText: string): Promise<HTMLIonLoadingElement>{
    const loading = await this._loadingCtrl.create({
      message: messageText
    });
    await loading.present();
    return loading;
  }

  async dismissLoading(loading :HTMLIonLoadingElement){
    loading.dismiss();
  }

  async presentLoadingWithOptions() {
    const loading = await this._loadingCtrl.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async showLoadingOnRouteTransition(router: Router, isLoadingRouteConfig: boolean ) {
    router.events.subscribe(async event => {
      if (event instanceof RouteConfigLoadStart) {
        //console.log("start");
        isLoadingRouteConfig = true;
        return await this._loadingCtrl.create({
          spinner: 'circles',
          duration: 5000, // in case it stucks, it will close after 5 seconds.
        }).then(a => {
          a.present().then(() => {
            //console.log('presented');
            if (!isLoadingRouteConfig) {
              a.dismiss().then(() => {
                //console.log('abort presenting')
              });
            }
          });
        });
      } else if (event instanceof RouteConfigLoadEnd) {
        isLoadingRouteConfig = false;
      }
    });
  }

  async startLoadingOnAppBoot() {
    this.loadingOnAppBoot = await this._loadingCtrl.create({
      spinner: 'circles',
      duration: 8000, // in case it stucks, it will close after 8 seconds.
    });
    this.loadingOnAppBoot.present();
  }

  async stopLoadingOnAppBoot() {
    this.loadingOnAppBoot.dismiss();
  }
}