import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import {Chance} from 'chance';
const chance = new Chance();

const terrainColors = [
  'blue',
  'grey',
  'green',
  'orange'
];

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements OnInit {
  public cols = [-4,-3,-2,-1,0,1,2,3,4]; // x
  public rows = [4,3,2,1,0,-1,-2,-3,-4]; // y
  public fullMap;
  public currentLoc: number[];

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.mapService.getMap().subscribe((map) => {
      console.log('mini-map', map);
      this.fullMap = map;
    });

    this.mapService.getLoc().subscribe((loc) => {
      console.log('mini-map - LOC', loc);
      this.currentLoc = loc;
    });
  }

  getGridLight(xMod: number, yMod: number) {
    const gridMapIdx = (this.currentLoc[0] + xMod).toString() + '.' + (this.currentLoc[1] + yMod).toString();
    // if (xMod === 0 && yMod === 0) {

      // console.log('get grid light - this.fullMap[gridMapIdx], gridMapIdx', this.fullMap[gridMapIdx], gridMapIdx);
    // }

    return this.fullMap[gridMapIdx] ? this.fullMap[gridMapIdx].light : '';
    // return this.fullMap[gridMapIdx] && this.fullMap[gridMapIdx].light ? this.fullMap[gridMapIdx].light : chance.pickone(terrainColors);
  }
}
