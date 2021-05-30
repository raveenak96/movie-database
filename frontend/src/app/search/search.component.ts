import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit,ViewEncapsulation,Output,EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [SearchService],
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent  {
  model: any;
  searching = false;
  searchFailed = false;
  @Output() onCollapse = new EventEmitter<boolean>();
  public mobile = false;
  constructor(private _service: SearchService,private breakpointObserver:BreakpointObserver) {}

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._service.getResults(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

    formatter = (x: {title: string}) => "";

    ngOnInit() {
      this.breakpointObserver.observe('(max_width:768px)').subscribe(result => {this.mobile = result['matches']})
    }

    setCollapsed() {
      this.onCollapse.emit(true);
    }
}
