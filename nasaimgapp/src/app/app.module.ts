import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

//*********/ Routes /*********//
import { AppRoutingModule } from './app-routing.module';

//*********/ Components /*********//
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { GridComponent } from './components/grid/grid.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ImageComponent } from './components/image/image.component';
import { LoginComponent } from './components/login/login.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { CookiesAdvertComponent } from './components/cookies-advert/cookies-advert.component';

//*********/ Pages /*********//
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { RandomComponent } from './pages/random/random.component';
import { ContactComponent } from './pages/contact/contact.component';

//*********/ NgBoostrap /*********//
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//*********/ Angular Animations /*********//
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//*********/ Pipes /*********//
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { FirstNamePipe } from './pipes/first-name.pipe';

//*********/ Angular Firestore /*********//
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    GridComponent,
    HomeComponent,
    SearchComponent,
    ImageComponent,
    FavouritesComponent,
    LoadingComponent,
    SafeUrlPipe,
    RandomComponent,
    FirstNamePipe,
    LoginComponent,
    ScrollToTopComponent,
    ContactComponent,
    CookiesAdvertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
