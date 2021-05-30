import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment'

const BACKEND_URL = environment.backend + 'curr-playing-mov'
const HEADERS = new HttpHeaders ({
  'Access-Control-Allow-Origin': '*'
})
export interface currPlayItem {
  id: number;
  title: string;
  backdrop_path: string;
}
@Injectable({
  providedIn: 'root'
})
export class CurrentlyPlayingService {

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<currPlayItem[]>(BACKEND_URL,{ headers: HEADERS })
  }
}
