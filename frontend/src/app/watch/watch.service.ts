import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Time } from '@angular/common';
import { StringLiteralLike } from 'typescript';
import { environment } from '../../environments/environment'



const HEADERS = new HttpHeaders ({
  'Access-Control-Allow-Origin': '*'
})

export interface itemDetails {
  title: string;
  genres: Array<string>;
  spoken_languages: Array<string>;
  first_air_date: string;
  release_date: string;
  runtime: string;
  overview: string;
  vote_average: number;
  tagline: string;
  episode_run_time: number;
  poster_path: string;
}[]

export interface review {
  author: string;
  content: string;
  created_at: Date;
  url: string;
  rating: number;
  avatar_path: string;

}

export interface castMember {
  id: string;
  title: string;
  character: string;
  profile_path: string;
}

export interface videoItem {
  key: string;
  site: string;
}
@Injectable({
  providedIn: 'root'
})
export class WatchService {

  constructor(private http: HttpClient) { }

  getDetails(media_type: string, id: string) {
      var par = {'id':id,'media_type':media_type}
      var backend_url = environment.backend + 'details'
      if(media_type=='movie') {
        return this.http.get<itemDetails>(backend_url,{ params:par,headers:HEADERS })
      } else {
        return this.http.get<itemDetails>(backend_url,{ params:par,headers:HEADERS })
      }

  }

  getReviews(media_type: string, id: string) {
    var par = {'id':id,'media_type':media_type}
    var backend_url = environment.backend + 'reviews'
    return this.http.get<review[]>(backend_url,{ params:par,headers:HEADERS })
    

  }

  getCast(media_type: string, id: string) {
    var par = {'id':id,'media_type':media_type}
    var backend_url = environment.backend + 'cast'
    return this.http.get<castMember[]>(backend_url,{ params:par,headers:HEADERS })
    

}

  getVideo(media_type: string, id: string) {
    var par = {'id':id,'media_type':media_type}
    var backend_url = environment.backend + 'videos'
    return this.http.get<videoItem>(backend_url,{ params:par,headers:HEADERS })
  }

  }

