import { Component, OnInit } from '@angular/core';
import { MarketService } from './market.service';
import { ProfileService } from '../profile/profile.service';

type Sale = {
  name: string;
  price: number;
};

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  // public newSaleItem;
  // public newPrice: string;
  public sales: Sale[] = [];

  constructor(
    private marketService: MarketService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    // this.marketService.getNewSale().subscribe(newSale => {
    //   this.newSaleItem = newSale; 
    // });

    this.marketService.getMarketItems().subscribe(marketItems => {
      this.sales = marketItems;
    });
  }

  // createSale() {
  //   console.log('new sale >>> ', this.newSaleItem);
  //   // this.sales.push({
  //   //   name: this.newSaleItem,
  //   //   price: 9
  //   // });
    
  //   this.marketService.addItemToMarket(this.newSaleItem);
  //   this.profileService.removeItem(this.newSaleItem);
  //   this.marketService.clearSale();
  // }

  cancelSale(i: number, itemName: string) {
    // this.sales.splice(i, 1);
    this.marketService.removeItemFromMarket(i);
    this.profileService.addItem(itemName);
  }
}
