import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NasaInterfaces } from 'src/app/interfaces/nasa-interfaces';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  public favouritesCollection: Observable<any[]>;
  private userID: string = '';
  public images: NasaInterfaces[] = [];
  public url: string = 'assets/mars-trip.jpeg';
  public isLoading: boolean = false;
  public message: string = 'Loading, please wait';
  public canDelete: boolean = true;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    // Check if the user is logged
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userID = user.uid;
        this.favouritesCollection = this.firestore
          .collection('favourites')
          .doc(user.uid)
          .collection('fav')
          .valueChanges();
        // Save user favourites in array from DB
        this.favouritesCollection.subscribe((data) => {
          this.images = data;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }
}
