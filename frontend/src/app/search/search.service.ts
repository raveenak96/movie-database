import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment'

const BACKEND_URL = environment.backend +'search'
const HEADERS = new HttpHeaders ({
  'Access-Control-Allow-Origin': '*'
})

export interface searchResult {
  id: number;
  title: string;
  backdrop_path: string;
  media_type: string;
}

@Injectable()
export class SearchService {


  constructor(private http: HttpClient) { }

  getResults(userQuery: string) {
    if (userQuery === '') {
      return of([]);
    }
    return this.http.get<searchResult[]>(BACKEND_URL,{ params: {'query':userQuery}, headers: HEADERS })
  }
}
