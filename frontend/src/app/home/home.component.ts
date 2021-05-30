import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {


  media_types = ["movie","tv"]
  routes = ["popular","top-rated","trending"]
  headings = ["Popular Movies","Top Rated Movies","Trending Movies","Popular TV Shows","Top Rated TV Shows","Trending TV Shows"]
  contWatch = ''
  public mobile = false;
  constructor(private breakpointObserver:BreakpointObserver) { }

  ngOnInit(): void {
    
    this.breakpointObserver.observe('(max-width:768px)').subscribe( result => {
      this.mobile = result['matches']
    }
    );
    if(window.localStorage.getItem('continueWatch') !== null) {
      this.contWatch = 'continueWatch';
    }

    
  }

}
