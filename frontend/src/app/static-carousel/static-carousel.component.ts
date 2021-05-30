import { Component, OnInit,Input,OnChanges } from '@angular/core';
import { moveEmitHelpers } from 'typescript';
import { ICarouselItem } from '../carousel-item';
import { StaticCarouselService } from './static-carousel.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-static-carousel',
  templateUrl: './static-carousel.component.html',
  providers: [StaticCarouselService],
  styleUrls: ['./static-carousel.component.css']
})
export class StaticCarouselComponent implements OnChanges {
  @Input() backendRoute: string;
  @Input() media_type: string;
  @Input() id: string;
  @Input() heading: string;
  public items : Array<Array<ICarouselItem>>;
  public showCaption = new Array<boolean>();
  private tempData: Array<ICarouselItem>;
  public carouselId:string;
  public mobile = false;
  constructor(private _service: StaticCarouselService, private breakpointObserver: BreakpointObserver) {
      this.items = []
      
    }

  ngOnChanges() {

    this.carouselId = this.heading.replace(/\s+/g, '').toLowerCase();
    if(this.backendRoute==='continueWatch') {
      const currContStr = window.localStorage.getItem('continueWatch')
      var currCont = currContStr !== null ? JSON.parse(currContStr) : [] 
      this.breakpointObserver.observe('(max-width: 768px)').subscribe(result =>
        {
          if(result['matches']) {
            this.mobile = true;
            this.showCaption = new Array(currCont.length).fill(true)
            currCont.forEach( (element) => this.items.push([element]) )
          } else {
            this.tempData = currCont;

            while(this.tempData.length>0) {
              this.items.push(this.tempData.slice(0,6))
              this.tempData = this.tempData.slice(6)
            }
          }
        })

    } else {
      this.items = []
      this._service.getMovies(this.backendRoute,this.media_type,this.id)
      .subscribe(
        data => { 

          
          this.breakpointObserver.observe('(max-width: 768px)').subscribe(result =>
            {

              if(result['matches']) {
                this.mobile = true;
                this.showCaption = new Array(data.length).fill(true)
                data.forEach( (element) => this.items.push([element]) )
              } else {
                this.tempData = data;
                this.showCaption = new Array(data.length).fill(false)
                while(this.tempData.length>0) {
                  this.items.push(this.tempData.slice(0,6))
                  this.tempData = this.tempData.slice(6)
                }
              }

            })

      })
    }

    

  }
  switchShowCaption(j:number,enter:boolean) {
    if(!this.mobile){
      this.showCaption[j] = enter
    }
  }
}
