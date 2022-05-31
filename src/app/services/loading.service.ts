import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(public loadingController: LoadingController) { }

  async presentLoading(messageText: string, durationMiliSec: number) {
    const loading = await this.loadingController.create({
      message: messageText,
      duration: durationMiliSec
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async createAndPresentLoading(messageText: string): Promise<HTMLIonLoadingElement>{
    const loading = await this.loadingController.create({
      message: messageText
    });
    await loading.present();
    return loading;
  }

  async dismissLoading(loading :HTMLIonLoadingElement){
    loading.dismiss();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
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
}