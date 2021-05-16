import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Maintenance } from '../models/maintenance.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(
    private _angularFireStore: AngularFirestore) { }

  /**
   * Get maintenance document.
   * @returns Observable of Maintenance.
   */
  async getMaintenance(): Promise<Observable<Maintenance>> {

    return this._angularFireStore.doc<Maintenance>("/TheMacroDiet/Production/Configuration/Maintenance").valueChanges();
  }

}