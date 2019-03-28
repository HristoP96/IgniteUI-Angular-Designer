import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: Observable<any>;
  constructor(private http: HttpClient) {
  }

  public getData () {
    return   this.http.get('http://localhost:4205/');
  }
}
