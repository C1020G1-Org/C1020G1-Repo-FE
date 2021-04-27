import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserverService {

  constructor() { }

  private observer = new Subject<any>();

  sendChangeEvent() {
    this.observer.next();
  }
  getChangeEvent(): Observable<any>{
    return this.observer.asObservable();
  }
}
