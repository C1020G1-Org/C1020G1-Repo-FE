import {Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  nameSearchEventEmitter = new EventEmitter();

  constructor() {
  }

  nameSearchComponent() {
    this.nameSearchEventEmitter.emit();
  }
}
