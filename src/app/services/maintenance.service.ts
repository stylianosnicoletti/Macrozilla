import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Maintenance } from '../models/maintenance.model';
import { AlertController } from '@ionic/angular';
import { SwUpdate } from '@angular/service-worker';
import { App } from '@capacitor/app';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(
    private _angularFireDatabase: AngularFireDatabase,
    private _alertController: AlertController,
    private _swUpdate: SwUpdate) { }

  /**
   * Get Maintenance values for Android
   * @returns Maintenance Observable
   */
  async getMaintenanceAndroid(): Promise<Observable<Maintenance>> {
    const fireObjectMaintenance = this._angularFireDatabase.object<Maintenance>('/Android');
    return await fireObjectMaintenance.valueChanges();
  }

  /**
   * Get Maintenance values for Web
   * @returns Maintenance Observable
   */
  async getMaintenanceWeb(): Promise<Observable<Maintenance>> {
    const fireObjectMaintenance = this._angularFireDatabase.object<Maintenance>('/Web');
    return await fireObjectMaintenance.valueChanges();
  }

  /**
   * Checks if there is an update and displace the corresponding alert for Android.
   * @param currentVersion Current Android version (E.g. 1.000) (1: Major, 0: Minor, 00: Patch)
   * @param latestMaintenanceSettings Latest Maintenance object for Android
   * @returns Present the corresponding alert
   */
  async checkForUpdateOrAvailabilityAndroid(currentVersion: string, latestMaintenanceSettings: Maintenance): Promise<void> {
    // App unavailable
    if (!latestMaintenanceSettings.Enabled) {
      // Maintenance site
      // TODO

      // Android hardware back button actions 
      App.addListener('backButton', data => {
        App.exitApp();
      });
      return this.presentAlertUnavailableWeb(latestMaintenanceSettings.EnabledMessage);
    }
    // Check Major
    if (Number.parseInt(currentVersion[0]) < Number.parseInt(latestMaintenanceSettings.UpdateLatestVersion[0])) {
      // Maintenance site
      // TODO

      // Android hardware back button actions 
      App.addListener('backButton', data => {
        App.exitApp();
      });
      return this.presentAlertMajorUpdateAndroid(latestMaintenanceSettings.UpdateMessageMajor, latestMaintenanceSettings.UpdateUrl);
    }
    // Check Minor
    if (Number.parseInt(currentVersion[2]) < Number.parseInt(latestMaintenanceSettings.UpdateLatestVersion[2])) {
      return this.presentAlertMinorUpdateAndroid(latestMaintenanceSettings.UpdateMessageMinor, latestMaintenanceSettings.UpdateUrl);
    }
  }

  /**
   * Checks if there is an update and displace the corresponding alert for Web.
   * @param currentVersion Current Web version (E.g. 1.0.0) (1: Major, 0: Minor, 0: Patch)
   * @param latestMaintenanceSettings Latest Maintenance object for Web
   * @returns Present the corresponding alert
   */
  async checkForUpdateOrAvailabilityWeb(currentVersion: string, latestMaintenanceSettings: Maintenance): Promise<void> {
    // App unavailable
    if (!latestMaintenanceSettings.Enabled) {
      // Maintenance site & no back button 
      // TODO
      return this.presentAlertUnavailableWeb(latestMaintenanceSettings.EnabledMessage);
    }
    // Check Major
    if (Number.parseInt(currentVersion[0]) < Number.parseInt(latestMaintenanceSettings.UpdateLatestVersion[0])) {
      // Maintenance site & no back button 
      // TODO
      return this.presentAlertMajorUpdateWeb(latestMaintenanceSettings.UpdateMessageMajor);
    }
    // Check Minor
    if (Number.parseInt(currentVersion[2]) < Number.parseInt(latestMaintenanceSettings.UpdateLatestVersion[2])) {
      return this.presentAlertMinorUpdateWeb(latestMaintenanceSettings.UpdateMessageMinor);
    }
  }

  /**
   * Present Unavailable Alert for Android
   */
  async presentAlertUnavailableAndroid(enabledMessage: string): Promise<void> {
    const alert = await this._alertController.create({
      header: 'The app is not available at the moment!',
      message: enabledMessage,
      backdropDismiss: false
    });
    await alert.present();
  }

  /**
   * Present Major Update Alert for Android
   */
  async presentAlertMajorUpdateAndroid(updateMessageMajor: string, updateUrl: string): Promise<void> {
    const alert = await this._alertController.create({
      header: 'A major update is required',
      message: updateMessageMajor,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Update',
          handler: () => {
            window.location.href = updateUrl;
            return false;
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * Present Minor Update Alert for Android
   */
  async presentAlertMinorUpdateAndroid(updateMessageMinor: string, updateUrl: string): Promise<void> {
    const alert = await this._alertController.create({
      header: 'An update is available!',
      message: updateMessageMinor,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Update',
          handler: () => {
            window.location.href = updateUrl;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false;
          }
        },
      ]
    });
    await alert.present();
  }

  /**
   * Present Unavailable Alert for Web
   */
  async presentAlertUnavailableWeb(enabledMessage: string): Promise<void> {
    const alert = await this._alertController.create({
      header: 'The app is not available at the moment!',
      message: enabledMessage,
      backdropDismiss: false
    });
    await alert.present();
  }

  /**
   * Present Major Update Alert for Web
   */
  async presentAlertMajorUpdateWeb(updateMessageMajor: string): Promise<void> {
    const alert = await this._alertController.create({
      header: 'A major update is required!',
      message: updateMessageMajor,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Update',
          handler: () => {
            // Update ng-worker
            if (this._swUpdate.isEnabled) {
              //console.log("Updating ng-worker")
              this._swUpdate.activateUpdate();
            }
            window.location.reload();
            this.forceSWupdate();
            window.location.reload();
            // Force refresh and Navigate to root 
            const parsedUrl = new URL(window.location.href);
            const baseUrl = parsedUrl.origin;
            //console.log(baseUrl);
            window.location.href = baseUrl;
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * Present Minor Update Alert for Web
   */
  async presentAlertMinorUpdateWeb(updateMessageMinor: string): Promise<void> {
    const alert = await this._alertController.create({
      header: 'An update is available!',
      message: updateMessageMinor,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Update',
          handler: () => {
            // Update ng-worker
            if (this._swUpdate.isEnabled) {
              //console.log("Updating ng-worker")
              this._swUpdate.activateUpdate()
            }
            window.location.reload();
            this.forceSWupdate();
            window.location.reload();
            // Force refresh and Navigate to root 
            const parsedUrl = new URL(window.location.href);
            const baseUrl = parsedUrl.origin;
            //console.log(baseUrl);
            window.location.href = baseUrl;
            
          }
        }
      ]
    });
    await alert.present();
  }

  forceSWupdate () {
    if ('serviceWorker' in navigator) {
      //console.log("serviceWorker in navigaotor");
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          //console.log(registration);
          registration.update()
        }
      })
    }
  }
  
}
