import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AlbumComponent} from './components/album/albumlist.component';
import {CreateAlbumComponent} from './components/album/createalbum.component';
import {Auth} from './services/auth.service';
import {routing, appRoutingProviders} from './app.routing';
import {RouterModule} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {PhotoAlbComponent} from './components/album/indalb.component';
import {AlbumPhotoComponent} from './components/album/viewPhotos.component';
import {SlideshowComponent} from './components/album/slideshow.component';
import {FriendComponent} from './components/album/friend.component';
import {Ng2PaginationModule} from 'ng2-pagination';
export const firebaseConfig = {
   apiKey: "AIzaSyCANeKOFGwosl9Kol-Q7Q9jY6JeEZBnx0Q",
    authDomain: "my-project-655d3.firebaseapp.com",
    databaseURL: "https://my-project-655d3.firebaseio.com",
    storageBucket: "my-project-655d3.appspot.com",
    messagingSenderId: "526344397491"
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AlbumComponent,
    CreateAlbumComponent,
    PhotoAlbComponent,
    AlbumPhotoComponent,
    SlideshowComponent,
    FriendComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    Ng2PaginationModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
   providers: [
    appRoutingProviders,
    AUTH_PROVIDERS,
    Auth,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
