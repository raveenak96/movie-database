import { Component, OnInit,Input } from '@angular/core';
import { CastDetailsService,castInfo,castExternal } from './cast-details.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {faTwitter,faFacebookSquare, faImdb,faInstagram} from '@fortawesome/free-brands-svg-icons';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-cast-modal',
  templateUrl: './cast-modal.component.html',
  styleUrls: ['./cast-modal.component.css'],
  providers: [CastDetailsService]
})
export class CastModalComponent implements OnInit {

  @Input() public id;
  public actorDetails : castInfo;
  public actorExternal: castExternal;
  public mobile = false;
  constructor(private service: CastDetailsService,public activeModal: NgbActiveModal,private breakpointObserver: BreakpointObserver) { }

  twitter = faTwitter;
  fb = faFacebookSquare;
  imdb = faImdb;
  ig = faInstagram;

  ngOnInit(): void {
    this.service.getActorDetails(this.id).subscribe((data:any) =>
      {
        this.actorDetails = data["0"];
      }
    )

    this.service.getActorExternal(this.id).subscribe((data:any) =>
      {
        this.actorExternal = data["0"];
      }
    )
    this.breakpointObserver.observe('(max-width:768px').subscribe(result =>
      {this.mobile = result['matches']}
      )
  }

}
