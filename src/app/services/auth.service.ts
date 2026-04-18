import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, sendPasswordResetEmail,
  updateProfile, signOut} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    public auth: Auth) {
  }

  async doRegister(value): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      await createUserWithEmailAndPassword(this.auth, value.email, value.password)
        .then(async res => {
          await this.doUpdateDisplayName(value.userName);
          await sendEmailVerification(this.auth.currentUser);
          resolve(res);
        }, err => reject(err))
    })
  }

  async doUpdateDisplayName(profName): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      await updateProfile(this.auth.currentUser, { displayName: profName })
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  async doUpdateProfilePhotoURL(profPhoto): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      await updateProfile(this.auth.currentUser, { photoURL: profPhoto })
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  async doLogin(value): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      await signInWithEmailAndPassword(this.auth, value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  async doPasswordReset(value): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      await sendPasswordResetEmail(this.auth, value.email)
         .then(res => {
           resolve(res);
         }, err => reject(err))
    })
  }

  async doLogout(): Promise<any> {
    //quick hack to kill references to database
    //window.location.reload();
    return new Promise(async (resolve, reject) => {
      if (await this.auth.currentUser) {
        await signOut(this.auth).then(() => {
          window.localStorage.clear();
          window.sessionStorage.clear();
          window.location.reload();
        })
      }
      else {
        reject();
      }
    });
  }

  async doDeleteAccount(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (await this.auth.currentUser) {
        await (await this.auth.currentUser).delete()
        .then(res => {
          resolve(res);
        }, err => reject(err))
      }
      else {
        reject();
      }
    });
  }
  
}