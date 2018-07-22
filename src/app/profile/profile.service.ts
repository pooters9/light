import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { classMap, raceMap } from '../constants';
import { RoutesService } from '../routes.service';
// import { clearInterval } from 'timers';

let currentItems = [];
let currentEquip = [];
let baseStats: Stat[] = [
  {
    name: 'HP',
    value: 0
  },
  {
    name: 'Attack',
    value: 0
  },
  {
    name: 'Defense',
    value: 0
  }
]; 
let currentStats: Stat[] = [
  {
    name: 'HP',
    value: 0
  },
  {
    name: 'Attack',
    value: 0
  },
  {
    name: 'Defense',
    value: 0
  }
];   // hp, attack, def
let currentRace: Race;
let currentClass: Class;
let currentLevel: number = 1;
let currentStatMods: {name: string, valueMod: number}[] = [];
let currentLight;

@Injectable()
export class ProfileService {
  public light: BehaviorSubject<Light> = new BehaviorSubject('') as any;
  public level: BehaviorSubject<number> = new BehaviorSubject(1) as any;
  public altLight: BehaviorSubject<Light> = new BehaviorSubject('') as any;
  public items: BehaviorSubject<string[]> = new BehaviorSubject([]) as any;
  public equip: BehaviorSubject<string[]> = new BehaviorSubject([]) as any;
  public stats: BehaviorSubject<Stat[]> = new BehaviorSubject('') as any;
  public class: BehaviorSubject<Class> = new BehaviorSubject({}) as any;
  public race: BehaviorSubject<Race> = new BehaviorSubject({}) as any;

  public lightCount: number = 0;

  constructor(
    private routeService: RoutesService
  ) { }

  setLight(light: Light) {
    currentLight = light;
    console.log('set light', light);
    this.altLight.next(this._altLight(light));
    this.light.next(light);
  }

  _altLight(light: Light) {
    if (light === "light") {
      return "dark";
    } else {
      return "light";
    }
  }

  getLight() {
    return this.light.asObservable();
  }

  getAltLight() {
    return this.altLight.asObservable();
  }

  setLevel(newLevel: number) {
    currentLevel = newLevel;
    this._refreshBaseStats();
    this.level.next(newLevel);
  }

  getLevel() {
    return this.level.asObservable();
  }

  setClass(newClass: string) {
    const fullClass = classMap[newClass];
    currentClass = fullClass;
    this._refreshBaseStats();
    this.class.next(fullClass);
  }

  getClass() {
    return this.class.asObservable();
  }

  setRace(newRace: string) {
    const fullRace = raceMap[newRace];
    currentRace = fullRace;
    this.race.next(fullRace);
  }

  getRace() {
    return this.race.asObservable();
  }

  addItem(item: string) {
    currentItems.push(item);
    console.log('currentItems ADD', currentItems);
    this.items.next(currentItems);
  }

  removeItem(item: string) {
    let index = currentItems.indexOf(item);    // <-- Not supported in <IE9
    if (index !== -1) {
      currentItems.splice(index, 1);
    }
    console.log('currentItems REMOVE', currentItems);
    this.items.next(currentItems);
  }

  getItems() {
    return this.items.asObservable();
  }

  toggleAbility(abilityName: string) {
    currentRace.abilities.forEach((ability, idx) => {
      if (ability.name === abilityName) {
        currentRace.abilities[idx].active = !currentRace.abilities[idx].active;
      } else if(!ability.passive) {
        currentRace.abilities[idx].active = false;
      }
    });
    currentClass.abilities.forEach((ability, idx) => {
      if (ability.name === abilityName) {
        currentClass.abilities[idx].active = !currentClass.abilities[idx].active;
      } else if(!ability.passive) {
        currentClass.abilities[idx].active = false;
      }
    });
    this._refreshBaseStats();
    this.race.next(currentRace)
    this.class.next(currentClass);
  }

  private _refreshBaseStats() {
    baseStats = [
      {
        name: 'HP',
        value: this._getBaseStatVal('HP')
      },
      {
        name: 'Attack',
        value: this._getBaseStatVal('Attack')
      },
      {
        name: 'Defense',
        value: this._getBaseStatVal('Defense')
      }
    ];

    this.stats.next(baseStats);
    this._refreshCurrentStats();
  }

  private _refreshCurrentStats() {
    currentStats = baseStats;
  }
  
  private _getBaseStatVal(statName): number {
    let baseStatVal = 3 + currentRace.baseStats[statName] + currentClass.baseStats[statName];
    // let itemModVal = 0;
    currentEquip.forEach(equip => {
      if (this._whichStat(equip) === statName) {
        const itemVal = Number(equip.split(' ')[1].replace('+', ''));
        baseStatVal += itemVal;
      };
    });
    
    let lvlStatMods = [];
    let multiplyStatMods = [];
    const abs = [...currentRace.abilities, ...currentClass.abilities];
    console.log('abs', abs);
    abs.forEach(abi => {
      if (abi.statMod && abi.active) {

        abi.statMod.forEach(abiStatMod => {
          if (abiStatMod.name === statName) {
            if (abiStatMod.lvlMod) {
              lvlStatMods.push(abiStatMod)
            } else {
              multiplyStatMods.push(abiStatMod);
            }
          }
        });
      }
    });
    lvlStatMods.forEach(lvlStatMod => {
      baseStatVal += lvlStatMod.value * currentLevel;
    });
    multiplyStatMods.forEach(multStatMod => {
      baseStatVal = this._modVals(baseStatVal, multStatMod.value, multStatMod.func); 
    });

    return baseStatVal;
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

  addEquip(equip: string) {
    currentEquip.push(equip);
    // const itemVal = Number(equip.split(' ')[1].replace('+', ''));
    // this.modifyStat({
    //   name: this._whichStat(equip),
    //   valueMod: 0
    // });
    this._refreshBaseStats();
    console.log('currentEquip ADD', currentEquip);
    this.equip.next(currentEquip);
  }

  removeEquip(equip: string) {
    let index = currentEquip.indexOf(equip);    // <-- Not supported in <IE9
    if (index !== -1) {
      currentEquip.splice(index, 1);
    }
    // const itemVal = Number(equip.split(' ')[1].replace('+', ''));
    // this.modifyStat({
    //   name: this._whichStat(equip),
    //   valueMod: 0
    // });
    this._refreshBaseStats();
    console.log('currentEquip REMOVE', currentEquip);
    this.equip.next(currentEquip);
  }

  getEquip() {
    return this.equip.asObservable();
  }

  modifyStat(stat: {name: string, valueMod: number}) {
    let index = currentStats.findIndex(currentStat => currentStat.name === stat.name);
    const oldVal = currentStats[index].value;
    // let index = currentStats.indexOf(stat.name);
    // if (index === -1) {
    //   index = currentStats.length;
    // }
    
    currentStats[index].value += stat.valueMod;
    currentStatMods.push(stat);
    
    if (currentStats[0].value > 0) {
      this.stats.next(currentStats);
    } else {
      this.reset();
    }
  }

  private _modifiedStatVal(stat: Stat, currentStatIndex: number): number {
    const oldVal = currentStats[currentStatIndex] ? currentStats[currentStatIndex].value : 0;
    let newVal = oldVal;
    // currentStats[currentStatIndex].value += oldVal;

    // if (currentRace.abilities.find(ability => ability.statMod.name === stat.name)) {
    //   const statMod = currentRace.abilities.find(ability => ability.statMod.name === stat.name).statMod;
    //   val = this._modVals(val, statMod.value, statMod.func);
    //   // val = stat.value * currentRace.abilities.find(ability => ability.statMod.name === stat.name).statMod.value
    // }

    let lvlStatMods = [];
    let multiplyStatMods = [];
    const raceAbils = currentRace.abilities;
    const classAbils = currentClass.abilities;
    currentRace.abilities.forEach(abi => {
      abi.statMod.forEach(abiStatMod => {
        if (abiStatMod.name === stat.name) {
          if (abiStatMod.lvlMod) {
            lvlStatMods.push(abiStatMod)
          } else {
            multiplyStatMods.push(abiStatMod);
          }
        }
      });
    });

    return newVal;
  }

  private _modVals(oldVal: number, modVal: number, modFunc: string): number {
    let newVal;
    switch(modFunc) {
      case '+':
        newVal = oldVal + modVal;
        break;
      case '-':
        newVal = oldVal - modVal;
        break;
      case '*':
        newVal = oldVal * modVal;
        break;
      case '/':
        newVal = oldVal / modVal;
        break;
    }
    return newVal;
  }
  
  reset() {
    currentStats.forEach(stat => {
      stat.value = 3;
    });
    currentItems = [];
    currentEquip = [];
    this.setLight(this._altLight(currentLight));
    this.items.next([]);
    this.equip.next([]);
    this.stats.next(currentStats);

    alert('You have been converted to the ' + currentLight);
    this.routeService.setRoute('create');
    // this.route.setRoute('intro');
  }

  getStats() {
    return this.stats.asObservable();
  }

  battle(attack: number, def: number, hp: number) {
    // this.updateStats({
    //   name: 'Attack',
    //   value: def * -1
    // });

    // let interval = setInterval(() => {
      // console.log('battle interval!');

      const defIndex = currentStats.findIndex(currentStat => currentStat.name === 'Defense');
      const currentDef = currentStats[defIndex].value;
      const attackIndex = currentStats.findIndex(currentStat => currentStat.name === 'Attack');
      const currentAttack = currentStats[attackIndex].value;
  
      // const defMod = attack > currentDef ? currentDef : attack;
      const hpMod = attack > currentDef ? attack - currentDef : 0;
  
      if (currentStats[0].value < hpMod) {
        this.reset();
        // clearInterval(interval);
        // return hp;
      } else {
        currentStats[0].value -= hpMod;
      }

      if (currentAttack > def) {
        if (currentAttack < def + hp) {
          // successful attack, return new mob HP
          hp -= currentAttack - def;
        } else {
          // successful attack, return mob HP as 0
          hp = 0;
          this.lightCount += 1;
          if (this.lightCount > currentLevel * 5) {
            this.setLevel(currentLevel + 1);
            alert('Level Up!');
          }
          // clearInterval(interval);
        }
        return hp;
      } else {
        // attack failed - return current mob hp
        return hp;
      }
    // }, 1000);

    // return hp remaining of attacker
    // return hp;
  }
}
