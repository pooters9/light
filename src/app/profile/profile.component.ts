import { Component, OnInit, HostListener } from '@angular/core';
import { ProfileService } from './profile.service';
import { RoutesService } from '../routes.service';
import { MarketService } from '../market/market.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public items: string[];
  public stats;
  public equipment: string[] = [];
  public className: string;
  public raceName: string;
  // public showMap: boolean;
  // public showMarket: boolean;

  private canEquip: string[] = [];

  constructor(
    private profileService: ProfileService,
    private marketService: MarketService
    // private route: RoutesService
  ) { }

  // @HostListener('window:keydown', ['$event'])
  // keyEvent(event: KeyboardEvent) {
  //   if(event.code === 'Escape') {
      // this.showMap = false;
      // this.showMarket = false;
  //   }
  // }

  ngOnInit() {
    this.profileService.getItems().subscribe(currentItems => {
      this.items = currentItems;
    });

    this.profileService.getStats().subscribe(currentStats => {
      this.stats = currentStats;
      console.log('PROF STATS', this.stats);
    });

    this.profileService.getClass().subscribe(currentClass => {
      this.className = currentClass.name;
      this.canEquip = currentClass.equipment;
    });

    this.profileService.getRace().subscribe(currentRace => {
      this.raceName = currentRace.name;
    });
  }

  equipItem(item: string) {
    console.log('EQUIP ITEM ->', item);
    const itemType = item.split(' ')[0];
    if (!this.canEquip.includes(itemType)) {
      alert(`Cannot equip ${itemType}s.`);
      return;
    }
    if (this.equipment.some(equip => equip.split(' ')[0] === itemType)) {
      alert(`${itemType} already equipped.`);
      return;
    }
    
    const itemVal = Number(item.split(' ')[1].replace('+', ''));
    this.profileService.updateStats({
      name: this._whichStat(item),
      value: itemVal
    });

    this.equipment.push(item);
    this.marketService.clearSale();
    this.profileService.removeItem(item);
  }

  unequipItem(item: string, idx: number) {
    const itemVal = Number(item.split(' ')[1].replace('+', ''));
    this.profileService.updateStats({
      name: this._whichStat(item),
      value: itemVal * -1
    });

    this.equipment.splice(idx, 1);
    this.profileService.addItem(item);
  }

  sellItem(item: string) {
    this.profileService.removeItem(item);
    this.marketService.addItemToMarket(item);
  }

  // get the stat to update based on the item name
  private _whichStat(itemName: string) {
    let stat = 'Attack';
    const itemType = itemName.split(' ')[0];
    console.log('item Type', itemType);
    switch (itemType) {
      case 'Helmet':
      case 'Shield':
      case 'Armor':
        stat = 'Defense';
        break;
    }

    return stat;
  }

}
