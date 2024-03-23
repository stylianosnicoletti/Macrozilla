import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    public afAuth: AngularFireAuth) {
  }

  async doRegister(value): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      await this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(async res => {
          await this.doUpdateDisplayName(value.userName);
          await this.afAuth.currentUser.then(async u => await u.sendEmailVerification());
          resolve(res);
        }, err => reject(err))
    })
  }

  async doUpdateDisplayName(profName): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      await this.afAuth.currentUser
        .then(async u => await u.updateProfile({ displayName: profName })
          .then(res => {
            resolve(res);
          }, err => reject(err))
        )
    })
  }

  async doUpdateProfilePhotoURL(profPhoto): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      await this.afAuth.currentUser
        .then(async u => await u.updateProfile({ photoURL: profPhoto })
          .then(res => {
            resolve(res);
          }, err => reject(err))
        )
    })
  }

  async doLogin(value): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      await this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  async doPasswordReset(value): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      await this.afAuth.sendPasswordResetEmail(value.email)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  async doLogout(): Promise<any> {
    //quick hack to kill references to database
    //window.location.reload();
    return new Promise(async (resolve, reject) => {
      if (await this.afAuth.currentUser) {
        await this.afAuth.signOut().then(() => {
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
      if (await this.afAuth.currentUser) {
        await (await this.afAuth.currentUser).delete()
        .then(res => {
          resolve(res);
        }, err => reject(err))
      }
      else {
        reject();
      }
    });
  }

  /*
  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        //console.log(err);
        reject(err);
      })
    })
  }

  doTwitterLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        //console.log(err);
        reject(err);
      })
    })
  }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        //console.log(err);
        reject(err);
      })
    })
  }
*/
}