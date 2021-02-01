import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { NasaInterfaces } from '../interfaces/nasa-interfaces';

@Injectable({
  providedIn: 'root',
})
export class NasaService {
  private baseUrl: string = 'https://api.nasa.gov/planetary/apod?';
  private apiKey: string = 'OYSZpOCQZkGNoZ1fPegPXAk0mvlLYgmgQXr4sfZb';

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {}

  getImageDay(date: string) {
    return this.http.get(`${this.baseUrl}api_key=${this.apiKey}&date=${date}`);
  }

  getRandom() {
    return this.http.get(`${this.baseUrl}api_key=${this.apiKey}&count=20`);
  }

  async saveImage(infoNasa: NasaInterfaces) {
    let user = firebase.auth().currentUser;
    return await this.firestore
      .collection('favourites')
      .doc(user.uid)
      .set(
        {
          id: user.uid,
          name: user.displayName,
          mail: user.email,
        },
        { merge: true }
      )
      .then(() => {
        this.firestore
          .collection('favourites')
          .doc(user.uid)
          .collection('fav')
          .doc(infoNasa.date.toString())
          .set(infoNasa);
        return true;
      });
  }

  async deleteImage(arrayPosition: number, imageDate: string) {
    let user = firebase.auth().currentUser;
    return await this.firestore
      .collection('favourites')
      .doc(user.uid)
      .collection('fav')
      .doc(imageDate)
      .delete();
  }

  login(tipo: string) {
    switch (tipo) {
      case 'google':
        this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        break;
      case 'facebook':
        let fbProvider = new firebase.auth.FacebookAuthProvider();
        this.auth.signInWithPopup(fbProvider).catch((err) => {
          console.log(err.message);
        });
        break;
      case 'github':
        this.auth
          .signInWithPopup(new firebase.auth.GithubAuthProvider())
          .catch((err) => {
            console.log(err.message);
          });
        break;
      case 'twitter':
        this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
  }
  logout() {
    this.auth.signOut();
  }
}
