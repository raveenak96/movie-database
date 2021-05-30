import { AfterViewInit, Component, OnInit,ViewChild,OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription,Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { WatchService,review,castMember,videoItem,itemDetails } from './watch.service';
import {faTwitter,faFacebookSquare, faWindows} from '@fortawesome/free-brands-svg-icons';
import {NgbAlert,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CastModalComponent} from '../cast-modal/cast-modal.component'
import { BreakpointObserver } from '@angular/cdk/layout';


declare var twttr: any;
@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
  providers: [WatchService],
  entryComponents: [CastModalComponent]
})
export class WatchComponent implements OnInit,OnChanges{

  public mediaType : string;
  public id: string;
  public cast : Array<castMember>;
  public reviews : Array<review>;
  public video: SafeUrl;
  public details : itemDetails;
  public watchLink:string;
  public inList : boolean;
  public inContinue: boolean;
  private _add = new Subject<string>();
  private _remove = new Subject<string>();
  public mobile = false;
  addedSuccess = ''
  removeSuccess = ''
  constructor(private route: ActivatedRoute,private service: WatchService,private sanitizer: DomSanitizer,private modalService: NgbModal,private breakpointObserver: BreakpointObserver) { 

    this.mediaType = ''
    this.id = ''
    this.cast = []
    this.reviews = []
    this.video = this.sanitizer.bypassSecurityTrustResourceUrl('');
    this.watchLink = "";
    this.inList = false;
    this.route.params.subscribe(params => {
      this.mediaType = params['mediaType'];
      this.id = params['id'];
      // @ts-ignore: Unreachable code error

      this.ngOnInit();
      
      
    });
}
twitter = faTwitter;
fb = faFacebookSquare;

@ViewChild('addAlert', {static: false}) addAlert: NgbAlert;

@ViewChild('removeAlert', {static: false}) removeAlert: NgbAlert;


  ngOnInit() {
    this.watchLink = ''
    console.log("in init")
    this.breakpointObserver.observe('(max-width:768px)').subscribe(result =>
      { this.mobile = result['matches']})

      if (this.addAlert) {
        this.addAlert.close();
      }
      if (this.removeAlert) {
        this.removeAlert.close();
      }
      // @ts-ignore: Unreachable code error
      this.service.getDetails(this.mediaType,this.id).subscribe((data : any) => {
        this.details = data["0"]
        var item_info = {'id': this.id,'poster_path':this.details.poster_path,'title':this.details.title,'media_type':this.mediaType}
        if(window.localStorage.getItem('continueWatch') === null) {
          window.localStorage.setItem('continueWatch',JSON.stringify([item_info]));
        } else {
          const currContStr = window.localStorage.getItem('continueWatch')
          var currCont = currContStr !== null ? JSON.parse(currContStr) : []
          var foundCont = false
          currCont.forEach(element => {
            if(this.id===element['id']) {
              foundCont = true;
            }
          });
          if(!foundCont) {
            if(currCont.length>=24) {
              currCont.pop()
            }
          } else {
              currCont = currCont.filter( (value,idx,arr) => {
              return this.id!==value.id })
          }
          var l = currCont.unshift(item_info);
          window.localStorage.setItem('continueWatch',JSON.stringify(currCont))
        }
      })
      this.service.getReviews(this.mediaType,this.id).subscribe(data => {
        this.reviews = data
      })
      this.service.getCast(this.mediaType,this.id).subscribe(data => {
        this.cast = data
      })
      this.service.getVideo(this.mediaType,this.id).subscribe(data => {
        
        if(data && data['key']) {

          this.watchLink = data.key;
        }
      })
      const currString = window.localStorage.getItem('myList')
      var currItems = currString !== null ? JSON.parse(currString) : []
      var found = false
      currItems.forEach(element => {
        if(this.id===element['id']) {
          found = true;
        }
      });
      this.inList = found;
      



    this._add.subscribe(message => this.addedSuccess = message);
    this._add.pipe(debounceTime(5000)).subscribe(() => {
      if (this.addAlert) {
        this.addAlert.close();
      }
    });

    this._remove.subscribe(message => this.removeSuccess = message);
    this._remove.pipe(debounceTime(5000)).subscribe(() => {
      if (this.removeAlert) {
        this.removeAlert.close();
      }
    });
  }

 
    openModal(id: string) {
      var modalRef = this.modalService.open(CastModalComponent,{centered: true,size:'lg',scrollable:true});
      modalRef.componentInstance.id = id;
    }

    public addToWatchList(details: itemDetails): void {
      var itemInfo = {'id': this.id,'poster_path':details.poster_path,'title':details.title,'media_type':this.mediaType}
      if(!this.inList) {
        if(localStorage.getItem('myList') === null) {
          window.localStorage.setItem('myList',JSON.stringify([itemInfo]))
        } else {
          const currString = window.localStorage.getItem('myList')
          var currItems = currString !== null ? JSON.parse(currString) : []
          var l = currItems.unshift(itemInfo)
          window.localStorage.setItem('myList',JSON.stringify(currItems))
        }
        this.inList = true;
        if (this.removeAlert) {
          this.removeAlert.close();
        }
        this._add.next('Added to watchlist.');
      }
    }


    public removeFromWatchList(details: itemDetails): void {
      if(this.inList) {
        const currString = window.localStorage.getItem('myList')
        var currItems = currString !== null ? JSON.parse(currString) : []
        currItems = currItems.filter( (value,idx,arr) => {
        return this.id!==value.id })
        window.localStorage.setItem('myList',JSON.stringify(currItems))
        this.inList = false;
        if (this.addAlert) {
          this.addAlert.close();
        }
        this._remove.next('Removed from watchlist.');
      }

    }
  
    ngOnChanges() {
      this.watchLink = ''
      this.service.getVideo(this.mediaType,this.id).subscribe(data => {
        
        if(data && data['key']) {

          this.watchLink = data.key;
        }
      })
    }
    
}
