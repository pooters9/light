/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

type Light = 'light' | 'dark';

type Stat = {
  name: string;
  value: number;
  func?: string;
  lvlMod?: number;
}

type Ability = {
  name: string;
  active: boolean;
  passive: boolean;
  statMod?: Stat[];
  desc?: string;
  extra?: any;
}

type Class = {
  name: string;
  equipment: string[];
  baseStats: {HP:number, Attack:number, Defense:number};
  abilities: Ability[];
}

type Race = {
  name: string;
  baseStats: {HP:number, Attack:number, Defense:number};
  abilities: Ability[];
}
