import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { RoutesService } from '../routes.service';
import { raceMap, classMap } from '../constants';

const raceLists = {
  'light': [
    'Angel',
    'Human',
    'Elf',
    'Robot'
  ],
  'dark': [
    'Ghost',
    'Vampire',
    'Dark Elf',
    'Undead'
  ]
};

const classLists = {
  'light': [
    'Time Priest',
    'Mechanic',
    'Druid',
    'Spartan'
  ],
  'dark': [
    'Blood Mage',
    'Necromancer',
    'Knight',
    'Witch'
  ]
};

const statMods = {
  // Races
  'Angel': {
    HP: 0,
    Attack: 0,
    Def: 6
  },
  'Human': {
    HP: 2,
    Attack: 2,
    Def: 2
  },
  'Elf': {
    HP: 0,
    Attack: 4,
    Def: 2
  },
  'Robot': {
    HP: 0,
    Attack: 3,
    Def: 3
  },
  'Ghost': {
    HP: 0,
    Attack: 2,
    Def: 4
  },
  'Vampire': {
    HP: 4,
    Attack: 2,
    Def: 0
  },
  'Dark Elf': {
    HP: 0,
    Attack: 6,
    Def: 0
  },
  'Undead': {
    HP: 3,
    Attack: 0,
    Def: 3
  },

  // Classes
  'Time Priest': {
    HP: 0,
    Attack: 3,
    Def: 6
  },
  'Mechanic': {
    HP: 0,
    Attack: 0,
    Def: 9
  },
  'Druid': {
    HP: 4,
    Attack: 2,
    Def: 3
  },
  'Spartan': {
    HP: 0,
    Attack: 6,
    Def: 3
  },
  'Blood Mage': {
    HP: 6,
    Attack: 3,
    Def: 0
  },
  'Necromancer': {
    HP: 0,
    Attack: 9,
    Def: 0
  },
  'Knight': {
    HP: 3,
    Attack: 3,
    Def: 3
  },
  'Witch': {
    HP: 3,
    Attack: 6,
    Def: 0
  }
};

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  light: Light;
  races: string[];
  raceSelected: string;
  raceAbilities: Ability[];
  // raceAbilitiesActivated: Ability[];
  // raceAbilitiesPassive: Ability[];
  classes: string[];
  classSelected: string;
  classAbilities: Ability[];
  classEquipment: string[];
  
  // private altLight;


  constructor(
    private profile: ProfileService,
    private route: RoutesService
  ) { }

  ngOnInit() {
    this.profile.getLight().subscribe((light) => {
      this.light = light;
      this.races = raceLists[light];
      this.classes = classLists[light];
      // console.log('sub light', light, this.races);
    });

    // this.profile.getRace().subscribe((race: Race) => {
    //   this.abilities = race.abilities;
    // });

    // this.profile.getAltLight().subscribe((altLight) => {
    //   console.log('sub alt light', altLight);
    //   this.altLight = altLight;
    // });

    // this.profile.getStats().subscribe(currentStats => {
    //   if (currentStats[0] && currentStats[0].value === 0) {
    //     console.log('SUB STATS', currentStats[0].value);
    //     this.route.setRoute('create');
    //     alert('You have been converted to the ' + this.altLight);
    //     this.profile.setLight(this.altLight);
    //   }
    // });
  }

  selectRace(race) {
    this.raceSelected = race;
    this.raceAbilities = raceMap[race].abilities;
    // this.raceAbilities = raceMap[race].abilities.map(ability => ability.extra = ability.passive ? "(passive)" : "(activated)");
    // this.raceAbilitiesActivated = raceMap[race].abilities.filter(ability => !ability.passive);
  }

  selectClass(classPassed: string) {
    this.classSelected = classPassed;
    this.classAbilities = classMap[classPassed].abilities;
    this.classEquipment = classMap[classPassed].equipment;
  }

  getRaceStatMods() {
    return raceMap[this.raceSelected].baseStats;
  }

  getClassStatMods() {
    return classMap[this.classSelected].baseStats;
  }

  begin() {
    this.profile.setRace(this.raceSelected);
    this.profile.setClass(this.classSelected);
    // this.profile.updateStats({
    //   name: 'HP',
    //   value: 3 + this.getRaceStatMods().HP + this.getClassStatMods().HP
    // });
    // this.profile.updateStats({
    //   name: 'Attack',
    //   value: 3 + this.getRaceStatMods().Attack + this.getClassStatMods().Attack
    // });
    // this.profile.updateStats({
    //   name: 'Defense',
    //   value: 3 + this.getRaceStatMods().Def + this.getClassStatMods().Def
    // });
    this.route.setRoute('zone');
  }
}
