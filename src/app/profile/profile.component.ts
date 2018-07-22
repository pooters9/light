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
  public level: number;

  private canEquip: string[] = [];

  constructor(
    private profileService: ProfileService,
    private marketService: MarketService
  ) { }

  ngOnInit() {
    this.profileService.getItems().subscribe(currentItems => {
      this.items = currentItems;
    });

    this.profileService.getEquip().subscribe(currentEquip => {
      this.equipment = currentEquip;
    });

    this.profileService.getStats().subscribe(currentStats => {
      this.stats = currentStats;
    });

    this.profileService.getClass().subscribe(currentClass => {
      this.className = currentClass.name;
      this.canEquip = currentClass.equipment;
    });

    this.profileService.getRace().subscribe(currentRace => {
      this.raceName = currentRace.name;
    });

    this.profileService.getLevel().subscribe(currentLevel => {
      this.level = currentLevel;
    });
  }

  canEquipItem(item: string) {
    const itemType = item.split(' ')[0];
    return this.canEquip.includes(itemType);
  }

  equipItem(item: string) {
    const itemType = item.split(' ')[0];
    const itemVal = Number(item.split(' ')[1].replace('+', ''));

    // check for matching gear already equipped
    let equipMatch = '';
    if (this.equipment.some(equip => {
      equipMatch = equip;
      return equip.split(' ')[0] === itemType;
    })) {
      console.log('Stronger Item? 1 >= 2', equipMatch.split(' ')[1].replace('+', '') , itemVal);
      if (Number(equipMatch.split(' ')[1].replace('+', '')) >= itemVal) {
        // alert if stronger or equal gear is already equipped
        alert(`Stronger or equal ${itemType} already equipped.`);
        return;
      }
      // auto unequip matched item if the new item is stronger
      this.profileService.removeEquip(equipMatch);
      this.profileService.addItem(equipMatch);
    }

    this.profileService.addEquip(item);
    this.profileService.removeItem(item);
  }

  unequipItem(item: string, idx: number) {
    this.profileService.removeEquip(item);
    this.profileService.addItem(item);
  }

  sellItem(item: string) {
    this.profileService.removeItem(item);
    this.marketService.addItemToMarket(item);
  }
}
