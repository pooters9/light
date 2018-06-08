import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MapService {
  public map: BehaviorSubject<any> = new BehaviorSubject({}) as any;
  public loc: BehaviorSubject<number[]> = new BehaviorSubject([0,0]) as any;

  constructor() { }

  saveMap(newMap) {
    this.map.next(newMap);
  }

  getMap() {
    return this.map.asObservable();
  }

  saveLoc(newLoc) {
    this.loc.next(newLoc);
  }

  getLoc() {
    return this.loc.asObservable();
  }
}
