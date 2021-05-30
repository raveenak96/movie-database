import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ICarouselItem } from '../carousel-item'

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {
  public myList: Array<Array<ICarouselItem>>;
  public showCaption: Array<boolean>;
  public mobile = false;
  public tempData: Array<ICarouselItem>
  constructor(private breakpointObserver: BreakpointObserver) {

    this.myList = []
    this.tempData = []
   }

  ngOnInit(): void {
    this.myList = []
    const currString = window.localStorage.getItem('myList')
    var fullList = currString !== null ? JSON.parse(currString) : []
    this.tempData = fullList
    this.showCaption = new Array(fullList.length).fill(false)
    while(this.tempData.length>0) {
      this.myList.push(this.tempData.slice(0,6))
      this.tempData = this.tempData.slice(6)
    }
    this.breakpointObserver.observe('(max-width:768px)').subscribe( result => {
      this.mobile = result['matches']
      if(this.mobile) {
        this.showCaption = new Array(fullList.length).fill(true)
      }

      }
    
      
      )
  }

  switchShowCaption(j:number,enter:boolean) {
    if(!this.mobile){
      this.showCaption[j] = enter
    }
  }

}
