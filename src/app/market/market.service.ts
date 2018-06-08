import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

type Sale = {
  name: string;
  price: number;
};

const currentMarketItems = [];

@Injectable()
export class MarketService {
  public newSale: BehaviorSubject<any> = new BehaviorSubject('') as any;
  public marketItems: BehaviorSubject<Sale[]> = new BehaviorSubject([]);

  constructor() { }

  // startSell(itemName: string) {
  //   this.newSale.next(itemName);
  // }

  // getNewSale(): Observable<string> {
  //   return this.newSale.asObservable();
  // }

  clearSale() {
    this.newSale.next('');
  }

  addItemToMarket(itemName: string) {
    currentMarketItems.push({
      name: itemName,
      price: 9
    });

    this.marketItems.next(currentMarketItems);
  }

  removeItemFromMarket(idx: number) {
    currentMarketItems.splice(idx, 1);
    this.marketItems.next(currentMarketItems);
  }

  getMarketItems(): Observable<Sale[]> {
    return this.marketItems.asObservable();
  }
}
