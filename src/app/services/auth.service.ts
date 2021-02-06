import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    public afAuth: AngularFireAuth) {
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          let user = firebase.auth().currentUser;
          this.doUpdateDisplayName(value.userName);
          user.sendEmailVerification();
          resolve(res);
        }, err => reject(err))
    })
  }

  doUpdateDisplayName(profName){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().currentUser.updateProfile({displayName : profName}).
      then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doUpdateProfilePhotoURL(profPhoto){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().currentUser.updateProfile({photoURL : profPhoto}).
      then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doPasswordReset(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(value.email)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogout() {
    //quick hack to kill references to database
    //window.location.reload();
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut().then(() => {
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

  /*
  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
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
        console.log(err);
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
        console.log(err);
        reject(err);
      })
    })
  }
*/
}