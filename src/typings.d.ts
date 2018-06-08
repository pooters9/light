/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

type Light = 'light' | 'dark';

type Stat = {
  name: string;
  func?: string;
  value: number;
}

type Ability = {
  name: string;
  active: boolean;
  statMod: Stat;
  extra?: any;
}

type Class = {
  name: string;
  equipment: string[];
}

type Race = {
  name: string;
  abilities: Ability[];
}
