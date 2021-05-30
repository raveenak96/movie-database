import { Component, OnInit,ViewChild } from '@angular/core';
import { CurrentlyPlayingService, currPlayItem } from './currently-playing.service';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { transform } from 'typescript';


@Component({
  selector: 'app-currently-playing',
  templateUrl: './currently-playing.component.html',
  providers: [CurrentlyPlayingService],
  styleUrls: ['./currently-playing.component.css'],
  animations: [
    trigger('onImg',[
      state('hovering',style({
        transform: 'scaleY(1.05)',
      })),
      state('hoveringImg',style({
        transform: 'scale(1.08)',
      })),
      transition('* <=> hoveringImg',[
        animate('0.1s')
      ]),
      transition('* <=> onImg',[
        animate('0.1s')
      ])
      
    ])
  ]
})
export class CurrentlyPlayingComponent implements OnInit {

  public movies : Array<currPlayItem>;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  showCaption = false;
  showNavigationIndicators = true;
  public mobile = true;
  constructor(private _service: CurrentlyPlayingService,private breakpointObserver: BreakpointObserver) { this.movies = []; this.showNavigationIndicators = true;}

  ngOnInit() {
    this._service.getMovies()
    .subscribe(
      data => { this.movies = data}
    )
    this.showNavigationIndicators = true;
    this.breakpointObserver.observe('(max-width: 768px)').subscribe(result =>
      { 
        this.mobile = result['matches']
        this.showNavigationIndicators = !result['matches'];
         } )
  }



  @ViewChild('carousel', {static : true})   carousel: NgbCarousel;




  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

}
