import { Component, OnInit, HostListener } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { MapService } from '../map/map.service';
import {Chance} from 'chance';
const chance = new Chance();

const resources = [
  'Food',
  'Gold',
  'Silver',
  'Wood',
  'Metal',
  'Oil'
];

const items = [
  'Helmet',
  'Armor',
  'Shield',
  'Spear',
  'Sword',
  'Bow'
];

const monsters = [
  'Goblin',
  'Skeleton',
  'Peasant'
];

type Build = {
  name: string;
  cost: number;
};

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  private level;
  private light;
  private location: number[] = [0, 0];
  private locationMap = {};

  public item = {
    name: '',
    imgSrc: ''
  };
  public mob = {} as any;
  public plots: string[] = [];
  public builds: string[] = [];
  public resourcesArray = [];

  constructor(
    private profile: ProfileService,
    private mapsService: MapService
  ) { }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log('KEY DOWN', event);
    switch(event.code) {
      case ('KeyW'):
      case ('ArrowUp'):
        this.updateLocation(0, 1);
        break;
      case ('KeyA'):
      case ('ArrowLeft'):
        this.updateLocation(-1, 0);
        break;
      case ('KeyS'):
      case ('ArrowDown'):
        this.updateLocation(0, -1);
        break;
      case ('KeyD'):
      case ('ArrowRight'):
        this.updateLocation(1, 0);
        break;
    }
  }

  ngOnInit() {
    this.profile.getLight().subscribe((light: string) => {
      this.light = light;
      console.log('LIGHT IN ZONE', light);
    });

    this.profile.getStats().subscribe((stats: Stat[]) => {
      this.level = stats[3] ? stats[3].value : 1;
    });

    this._newUserResources();
    // this.updateLocation(0,0);
    this._enterZone();
  }

  private _newUserResources() {
    resources.forEach((resource, idx) => {
      this.resourcesArray.push({
        name: resource,
        val: 0
      });
    });
  }

  private _enterZone(loc: string = '0.0') {
    const pts = [
      '0.0','0.1','1.1','1.0','-1.0','0.-1','-1.-1','1.-1','-1.1'
    ];
    console.log('this.locationMap[loc]', this.locationMap[loc]);
    if (this.locationMap[loc]) {
      this.builds = this.locationMap[loc].builds;
      this.plots = this.locationMap[loc].plots;
      this.item = this.locationMap[loc].item;
      this.mob = this.locationMap[loc].mob;
    } else if (pts.includes(loc)) {
      this._newPlots();
      this._saveMap();
    }
    else {
      this._newEmptyPlots();
      this._saveMap();
    }
    console.log('enter zone');
  }

  private _newEmptyPlots() {
    this.plots = [];
    this.builds = [];
    this.item = {name:'', imgSrc:''};

    this.mob = {
      hp: chance.natural({min: 1, max: 100 * this.level}),
      attack: chance.natural({min: 1, max: 100 * this.level}),
      def: chance.natural({min: 1, max: 100 * this.level}),
      name: chance.pickone(monsters)
    };

    console.log('plots empty?', this.plots);
  }

  private _newPlots() {
    this.mob = {};
    this.builds = [];
    this.plots[0] = chance.pickone(resources);
    this.plots[1] = chance.pickone(resources);
    this.plots[2] = chance.pickone(resources);
    this.plots[3] = chance.pickone(resources);

    console.log('this.plots', this.plots);
    this._newItem(1, 9);
  }

  private _newItem(min: number, max: number) {
    const randomItem = chance.pickone(items);
    this.item.name = `${randomItem} +${chance.natural({min:min, max:max})}`;
    this.item.imgSrc = this._getImageSource(randomItem);
  }

  private _getImageSource(itemName) {
    let imgSrc = 'https://image.shutterstock.com/z/stock-vector-sword-illustration-565637653.jpg';
    switch (itemName) {
      case 'Helmet':
        imgSrc = 'https://image.shutterstock.com/z/stock-vector-spartan-helm-calligraphic-illustration-785087917.jpg';
        break;
      case 'Armor':
        imgSrc = 'https://image.shutterstock.com/z/stock-photo-medieval-armor-on-the-body-in-the-style-of-a-lion-with-large-shoulder-pads-on-an-isolated-white-654910945.jpg';
        break;
      case 'Shield':
        imgSrc = 'https://image.shutterstock.com/z/stock-vector-empty-metal-shield-117250915.jpg';
        break;
      case 'Spear':
        imgSrc = 'https://image.shutterstock.com/z/stock-vector-ancient-spear-isolated-on-white-background-flat-style-vector-illustration-653390944.jpg';
        break;
      case 'Bow':
        imgSrc = 'https://image.shutterstock.com/z/stock-vector-cupid-icon-281775719.jpg';
        break;
    }

    return imgSrc;
  }

  // 'Food',
  // 'Gold',
  // 'Silver',
  // 'Wood',
  // 'Metal',
  // 'Oil'
  getResourcePic(resourceName) {
    let imgSrc = 'https://image.shutterstock.com/z/stock-photo-selection-of-healthy-food-for-heart-life-concept-554489488.jpg';
    switch (resourceName) {
      case 'Food':
        imgSrc = 'https://image.shutterstock.com/z/stock-photo-selection-of-healthy-food-for-heart-life-concept-554489488.jpg';
        break;
      case 'Gold':
        imgSrc = 'https://image.shutterstock.com/z/stock-photo-gold-bars-isolated-on-white-background-financial-concept-533644954.jpg';
        break;
      case 'Silver':
        imgSrc = 'https://image.shutterstock.com/z/stock-photo-silver-bars-50618959.jpg';
        break;
      case 'Wood':
        imgSrc = 'https://image.shutterstock.com/z/stock-photo-old-wood-background-146964500.jpg';
        break;
      case 'Metal':
        imgSrc = 'https://image.shutterstock.com/z/stock-photo-metal-background-121723600.jpg';
        break;
      case 'Oil':
        imgSrc = 'https://image.shutterstock.com/z/stock-photo-bottle-pouring-virgin-olive-oil-in-a-bowl-close-up-253044214.jpg';
        break;
    }

    return imgSrc;
  }

  // private _savePlots() {
  //   this.locationMap[]
  // }

  harvest(plotIndex: number) {
    const resource = this.plots[plotIndex];
    this.resourcesArray.forEach((res) => {
      if (res.name === resource) {
        res.val += chance.natural({min:1, max: 9});
        res.animate = true;
        console.log('animate', res.animate);
        setTimeout(() => {
          res.animate = false;
          console.log('animate 2', res.animate);
        }, 800);
      };
    });

    this.plots[plotIndex] = undefined;
  }

  build(buildIndex: number) {
    // this.builds[buildIndex] = {name:'Wall', cost:5};
    // if () {

    // }
    this.builds[buildIndex] = 'Wall';
    this.resourcesArray.forEach((res) => {
      console.log('build res', res);
      if (['Metal', 'Wood'].includes(res.name)) {
        res.val -= 5;
      }
    });
  }

  selectItem(itemClicked) {
    this.item = {name:'', imgSrc:''};
    this.profile.addItem(itemClicked.name);
  }

  updateLocation(xInc: number, yInc: number) {
    this._saveMap();
    
    this.location[0] += xInc;
    this.location[1] += yInc;
    
    const newLoc = this.location[0].toString() + '.' + this.location[1].toString();
    this._enterZone(newLoc);
  }

  _saveMap() {
    const oldLoc = this.location[0].toString() + '.' + this.location[1].toString();
    const plotCopy = Object.assign([], this.plots);
    const buildCopy = Object.assign([], this.builds);
    const itemCopy = Object.assign({}, this.item);
    const mobCopy = Object.assign({}, this.mob);
    const zoneLight = this.mob.hp ? '' : this.light;
    this.locationMap[oldLoc] = {
      plots: plotCopy,
      item: itemCopy,
      builds: buildCopy,
      mob: mobCopy,
      light: zoneLight
    };
    console.log('SAVE MAP IN ZONE - LIGHT ==>', this.light);
    this.mapsService.saveMap(this.locationMap);
    this.mapsService.saveLoc(this.location);
  }

  battle() {
    const mobHp = this.profile.battle(this.mob.attack, this.mob.def, this.mob.hp);
    console.log('MOB HP', mobHp);
    if (mobHp <= 0) {
      this._newItem(1, chance.natural({min: (this.mob.attack + this.mob.def) / 2, max: this.mob.attack + this.mob.def}));
      this.mob = {};
      this._saveMap();
    } else {
      this.mob.hp = mobHp;
    }
  }
}
