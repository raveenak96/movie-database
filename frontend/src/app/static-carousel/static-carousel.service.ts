import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import {ICarouselItem} from '../carousel-item'
import { environment } from '../../environments/environment'


const HEADERS = new HttpHeaders ({
  'Access-Control-Allow-Origin': '*'
})

@Injectable({
  providedIn: 'root'
})
export class StaticCarouselService {

  constructor(private http: HttpClient) {
  }

  getMovies(backEndRoute: string,media_type: string,id: string) {
    const BACKEND_URL = environment.backend + backEndRoute
    return this.http.get<ICarouselItem[]>(BACKEND_URL,{ params: {'media_type':media_type,'id':id}, headers: HEADERS })
  }

}