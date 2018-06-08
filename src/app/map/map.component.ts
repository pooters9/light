import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // public rows = [0,1,2,3,4,5,6,7,8,9];
  // public cols = [0,1,2,3,4,5,6,7,8,9];
  public rows = [];
  public cols = [];

  public mapsGrid;

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit() {
    // for(let i = 1; i <= 10; i++){
    //   this.cols.push(i.toString());
    // }
    // for(let i = 1; i <= 10; i++){
    //   this.rows.push(this.cols);
    // }
    // this.cols.forEach((row) => {
    //   this.rows.push(this.rows);
    // });
    this.mapService.getMap().subscribe((map) => {
      console.log('map', map);
      this.mapsGrid = Object.keys(map);

      this.mapsGrid.forEach(grid => {
        const col = Number(grid.split('.')[0]);
        const row = Number(grid.split('.')[1]);

        if (!this.cols.includes(col)) {
          this.cols.push(col);
        }
        if (!this.rows.includes(row)) {
          this.rows.push(row);
        }
        this.cols.sort((a,b) => a - b);
        this.rows.sort((a,b) => b - a);
        console.log('rows', this.rows);
        console.log('cols', this.cols);
      });

      console.log('mapsGrid', this.mapsGrid);
    });
  }

}
