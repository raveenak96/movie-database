import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from './app.component';
import { MylistComponent } from './mylist/mylist.component';
import { WatchComponent } from './watch/watch.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CurrentlyPlayingComponent } from './currently-playing/currently-playing.component';
import { SearchComponent } from './search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StaticCarouselComponent } from './static-carousel/static-carousel.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CastModalComponent } from './cast-modal/cast-modal.component';
import { Browser } from 'selenium-webdriver';



@NgModule({
  declarations: [
    AppComponent,
    MylistComponent,
    WatchComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CurrentlyPlayingComponent,
    SearchComponent,
    StaticCarouselComponent,
    CastModalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    YouTubePlayerModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
