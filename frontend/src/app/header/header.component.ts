import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public isMenuCollapsed = true;
  homeActive = true;
  listActive = false;
  public mobile = false;
  constructor(private breakpointObserver: BreakpointObserver) {

  }
  ngOnInit() {
    this.breakpointObserver.observe('(max-width:768px)').subscribe( result => { this.mobile = result['matches'] })
  }

  activate(item: string) {
    if(item=='list') {
      this.homeActive = false;
      this.listActive = true;
    } else {
      this.homeActive = true;
      this.listActive = false;
    }

  }

  changeCollapse(val: boolean) {
    this.isMenuCollapsed = val;
  }

}
