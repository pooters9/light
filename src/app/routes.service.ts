import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RoutesService {
  public route: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    // private profile: ProfileService
  ) { }

  setRoute(route) {
    console.log('set route', route);
    this.route.next(route);
  }

  getRoute() {
    return this.route.asObservable();
  }

  clearRoute() {
    this.route.next('');
  }
}
