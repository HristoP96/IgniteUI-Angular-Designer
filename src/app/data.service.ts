import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: Observable<any>;
  project: Subject<any>;
  constructor(private http: HttpClient) {
    this.project = new Subject<{}>();
  }

  public getData () {
    return   this.http.get('http://localhost:4205/api/file');
  }

  public postData(component) {
    this.http.post<string>('http://localhost:4205/api/form', component).
    subscribe(answer => {
      if (answer) {
        this.project.next(answer);
      }
    });
  }
}
