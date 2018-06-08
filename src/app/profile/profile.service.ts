import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { classMap, raceMap } from '../constants';
// import { clearInterval } from 'timers';

let currentItems = [];
let currentStats: Stat[] = [];   // hp, attack, def, level
let currentRace: Race;

@Injectable()
export class ProfileService {
  public light: BehaviorSubject<Light> = new BehaviorSubject('') as any;
  public altLight: BehaviorSubject<Light> = new BehaviorSubject('') as any;
  public items: BehaviorSubject<string[]> = new BehaviorSubject('') as any;
  public stats: BehaviorSubject<Stat[]> = new BehaviorSubject('') as any;
  public class: BehaviorSubject<Class> = new BehaviorSubject({}) as any;
  public race: BehaviorSubject<Race> = new BehaviorSubject({}) as any;

  constructor(
    // private route: RoutesService
  ) { }

  setLight(light: Light) {
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

  setClass(newClass: string) {
    const fullClass = classMap[newClass];
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

  updateStats(stat: {name: string, value: number}) {
    let index = currentStats.findIndex(currentStat => currentStat.name === stat.name);
    // let index = currentStats.indexOf(stat.name);
    if (index === -1) {
      index = currentStats.length;
    }
    const oldVal = currentStats[index] ? currentStats[index].value : 0;
    currentStats[index] = this._modifiedStat(stat);
    currentStats[index].value += oldVal;
    console.log('updateStats currentStats', currentStats);
    if (currentStats[0].value > 0) {

      const atk = currentStats[1] ? currentStats[1].value : 0;
      const def = currentStats[2] ? currentStats[2].value : 0;
      if (atk > 100 || def > 100) {
        let levelMod: number;
        if (atk > def) {
          levelMod = atk;
        } else {
          levelMod = def;
        }
        currentStats[3] = {
          name: 'Level',
          value: Math.ceil(levelMod / 100)
        };
      } else if (currentStats[3]) {
        currentStats[3].value = 1;
      }


      this.stats.next(currentStats);
    } else {
      this._reset();
    }
  }

  private _modifiedStat(stat: Stat): Stat {
    let val = stat.value;
    if (currentRace.abilities.find(ability => ability.statMod.name === stat.name)) {
      const statMod = currentRace.abilities.find(ability => ability.statMod.name === stat.name).statMod;
      val = this._modVals(val, statMod.value, statMod.func);
      // val = stat.value * currentRace.abilities.find(ability => ability.statMod.name === stat.name).statMod.value
    }

    return {
      name: stat.name,
      value: val
    };
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
  
  private _reset() {
    currentStats.forEach(stat => {
      stat.value = 0;
    });
    this.stats.next(currentStats);
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
        this._reset();
        // clearInterval(interval);
        // return hp;
      } else {
        currentStats[0].value -= hpMod;
      }
  
      // let enemyHP = ;
      if (currentAttack > def) {
        if (currentAttack < def + hp) {
          hp -= currentAttack - def;
          return hp;
        } else {
          hp = 0;
          // clearInterval(interval);
          return 0;
        }
      }
    // }, 1000);

    // return hp remaining of attacker
    // return hp;
  }
}
