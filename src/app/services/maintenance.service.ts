import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Maintenance } from '../models/maintenance.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(
    private _angularFireDatabase: AngularFireDatabase) { }

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
}
