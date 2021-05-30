import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

const HEADERS = new HttpHeaders ({
  'Access-Control-Allow-Origin': '*'
})

export interface castInfo {
  birthday: string;
  gender: string;
  title: string;
  homepage: string;
  also_known_as: Array<string>;
  known_for_department: string;
  biography: string;
  profile_path: string;
  place_of_birth: string;
}

export interface castExternal {
  imdb_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

@Injectable({
  providedIn: 'root'
})


export class CastDetailsService {


  constructor(private http: HttpClient) { }

  getActorDetails(id: string) {
    var par = {'id':id}
    var backend_url = environment.backend + 'cast-details'
    return this.http.get<castInfo>(backend_url,{ params:par,headers:HEADERS })
  }
  
  getActorExternal(id: string) {
    var par = {'id':id}
    var backend_url = environment.backend +'cast-external'
    return this.http.get<castExternal>(backend_url,{ params:par,headers:HEADERS })
  }
}
