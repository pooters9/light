export const classMap: {[key: string]:{ name: string; equipment: string[]; baseStats: {HP:number;Attack:number;Defense:number}; abilities: Ability[]}} = {
    'Time Priest': {
        name: 'Time Priest',
        equipment: ['Armor', 'Shield', 'Sword', 'Bow'],
        baseStats: {
            HP: 0,
            Attack: 3,
            Defense: 6
        },
        abilities: [
            {   
                name: 'Stop Time',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '*',
                        value: 0,
                    },
                    {
                        name: 'Defense',
                        func: '*',
                        value: 100,
                    }
                ],
                extra: ''
            },
            {   
                name: 'Speed',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'Attack',
                        func: '+',
                        value: 25,
                        lvlMod: 1
                    }
                ],
                extra: ''
            },
            {   
                name: 'Slow',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'Defense',
                        func: '+',
                        value: 25,
                        lvlMod: 1
                    }
                ],
                extra: ''
            },
            {   
                name: 'My clock at home is fast',
                active: true,
                passive: true,
                desc: 'Builds generate resources at 2x normal pace.',
                extra: ''
            }
        ]
    },
    'Mechanic': {
        name: 'Mechanic',
        equipment: ['Helmet', 'Armor', 'Shield'],
        baseStats: {
            HP: 0,
            Attack: 0,
            Defense: 9
        },
        abilities: [
            {   
                name: 'Repair Armor',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Defense',
                        func: '+',
                        value: 25,
                        lvlMod: 1
                    }
                ],
                extra: ''
            },
            {   
                name: 'Build Weapon',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '+',
                        value: 75,
                        lvlMod: 1
                    }
                ],
                extra: ''
            },
            {   
                name: 'Mining with a Wrench',
                active: true,
                passive: true,
                desc: 'Can break down equipment for raw materials.',
                extra: ''
            },
            {   
                name: 'Built with my own hands',
                active: true,
                passive: true,
                desc: 'Builds do not cost any Gold or Silver.',
                extra: ''
            }
        ]
    },
    'Druid': {
        name: 'Druid',
        equipment: ['Armor', 'Helmet', 'Spear', 'Bow'],
        baseStats: {
            HP: 4,
            Attack: 2,
            Defense: 3
        },
        abilities: [
            {   
                name: 'Hippo',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'HP',
                        func: '+',
                        value: 25,
                        lvlMod: 1
                    }
                ],
                extra: ''
            },
            {   
                name: 'Turtle',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Defense',
                        func: '*',
                        value: 2
                    }
                ],
                extra: ''
            },
            {   
                name: 'Jaguar',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '+',
                        value: 25,
                        lvlMod: 1
                    }
                ],
                extra: ''
            },
            {   
                name: 'Badger',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '*',
                        value: 2
                    }
                ],
                extra: ''
            }
        ]
    },
    'Spartan': {
        name: 'Spartan',
        equipment: ['Helmet', 'Armor', 'Shield', 'Spear', 'Sword', 'Bow'],
        baseStats: {
            HP: 0,
            Attack: 6,
            Defense: 3
        },
        abilities: [
            {   
                name: 'Phalanx',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '*',
                        value: 0
                    },
                    {
                        name: 'Defense',
                        func: '*',
                        value: 50
                    }
                ],
                extra: ''
            },
            {   
                name: 'Bull Rush',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '*',
                        value: 1.5
                    },
                    {
                        name: 'Defense',
                        func: '*',
                        value: 0.5
                    }
                ],
                extra: ''
            },
            {   
                name: 'Parry',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '*',
                        value: 0.5
                    },
                    {
                        name: 'Defense',
                        func: '*',
                        value: 1.5
                    }
                ],
                extra: ''
            },
            {   
                name: 'Warrior Heritage',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'Attack',
                        func: '+',
                        value: 10,
                        lvlMod: 1
                    },
                    {
                        name: 'Defense',
                        func: '+',
                        value: 10,
                        lvlMod: 1
                    }
                ],
                extra: ''
            }
        ]
    },
    'Blood Mage': {
        name: 'Blood Mage',
        equipment: ['Armor', 'Sword', 'Bow'],
        baseStats: {
            HP: 6,
            Attack: 3,
            Defense: 0
        },
        abilities: [
            {   
                name: 'Drain Life',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'HP',
                        func: '*',
                        value: 2
                    }
                ],
                extra: ''
            },
            {   
                name: 'Blood Poison',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '*',
                        value: 2
                    }
                ],
                extra: ''
            },
            {   
                name: 'Siphon Blood',
                active: true,
                passive: true,
                desc: 'Gain 5 HP after every kill on flesh.',
                extra: ''
            },
            {   
                name: 'Blood Market',
                active: true,
                passive: true,
                desc: 'Gain extra resources vs flesh.',
                extra: ''
            }
        ]
    },
    'Necromancer': {
        name: 'Necromancer',
        equipment: ['Helmet', 'Shield', 'Sword', 'Bow'],
        baseStats: {
            HP: 0,
            Attack: 9,
            Defense: 0
        },
        abilities: [
            {   
                name: 'Spirit Shield',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Defense',
                        func: '*',
                        value: 1.5
                    }
                ],
                extra: ''
            },
            {   
                name: 'Cursed Dagger',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '+',
                        value: 25,
                        lvlMod: 1
                    }
                ],
                extra: ''
            },
            {   
                name: 'Raise Dead',
                active: true,
                passive: true,
                desc: 'Can raise 1 dead mob or player as a minion.',
                extra: ''
            },
            {   
                name: 'Journey to the Underworld',
                active: true,
                passive: true,
                desc: 'Can return to life 1 time.',
                extra: ''
            }
        ]
    },
    'Knight': {
        name: 'Knight',
        equipment: ['Helmet', 'Armor', 'Shield', 'Sword'],
        baseStats: {
            HP: 3,
            Attack: 3,
            Defense: 3
        },
        abilities: [
            {   
                name: 'Umbral Armor',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Defense',
                        func: '+',
                        value: 25,
                        lvlMod: 1
                    }
                ],
                extra: ''
            },
            {   
                name: 'Shadow Flail',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '+',
                        value: 25,
                        lvlMod: 1
                    }
                ],
                extra: ''
            },
            {   
                name: 'Matte Targe',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'Defense',
                        func: '*',
                        value: 1.5
                    }
                ],
                extra: ''
            },
            {   
                name: 'Code of Dishonor',
                active: true,
                passive: true,
                desc: 'Can steal builds.',
                extra: ''
            }
        ]
    },
    'Witch': {
        name: 'Witch',
        equipment: ['Shield', 'Spear'],
        baseStats: {
            HP: 3,
            Attack: 6,
            Defense: 0
        },
        abilities: [
            {   
                name: 'Voodoo Doll',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '+',
                        value: 50,
                        lvlMod: 1
                    }
                ],
                extra: ''
            },
            {   
                name: 'Potion',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'HP',
                        func: '+',
                        value: 50,
                        lvlMod: 1
                    }
                ],
                extra: ''
            },
            {   
                name: 'Deflect',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'Defense',
                        func: '+',
                        value: 15,
                        lvlMod: 1
                    }
                ],
                extra: ''
            },
            {   
                name: 'Hex',
                active: false,
                passive: false,
                desc: 'Reduce enemy attack.',
                extra: ''
            }
        ]
    },
};

export const raceMap = {
    'Angel': {
        name: 'Angel',
        baseStats: {
            HP: 0,
            Attack: 0,
            Defense: 6
        },
        abilities: [
            {   
                name: 'Hand of Jesus',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'HP',
                        func: '+',
                        value: 25,
                        lvlMod: 1
                    }
                ],
                extra: ''
            },
            {   
                name: 'Shield of Virtue',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'Defense',
                        func: '*',
                        value: 1.5,
                    }
                ],
                extra: ''
            }
        ]
    },
    'Human': {
        name: 'Human',
        baseStats: {
            HP: 2,
            Attack: 2,
            Defense: 2
        },
        abilities: [
            {   
                name: 'Flesh',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'HP',
                        func: '*',
                        value: 1.5
                    }
                ],
                extra: ''
            },
            {   
                name: 'Engineering',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'Attack',
                        func: '*',
                        value: 1.25
                    },
                    {
                        name: 'Defense',
                        func: '*',
                        value: 1.25,
                    }
                ],
                extra: ''
            }
        ]
    },
    'Elf': {
        name: 'Elf',
        baseStats: {
            HP: 0,
            Attack: 4,
            Defense: 2
        },
        abilities: [
            {   
                name: 'Precision Strike',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '*',
                        value: 1.75
                    }
                ],
                extra: ''
            },
            {   
                name: 'Evasive',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'Defense',
                        func: '*',
                        value: 1.5,
                    }
                ],
                extra: ''
            }
        ]
    },
    'Robot': {
        name: 'Robot',
        baseStats: {
            HP: 0,
            Attack: 3,
            Defense: 3
        },
        abilities: [
            {   
                name: 'Metallic Plating',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '*',
                        value: 1.37,
                    },
                    {
                        name: 'Defense',
                        func: '*',
                        value: 2,
                    }
                ],
                extra: ''
            },
            {   
                name: 'Rubber Glue',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Defense',
                        func: '*',
                        value: 10,
                    }
                ],
                extra: ''
            }
        ]
    },
    'Ghost': {
        name: 'Ghost',
        baseStats: {
            HP: 0,
            Attack: 2,
            Defense: 4
        },
        abilities: [
            {   
                name: 'Sneak Attack',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '*',
                        value: 3
                    }
                ],
                desc: 'Hit first when active',
                extra: ''
            },
            {   
                name: 'Transparent',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'Defense',
                        func: '+',
                        value: 10,
                        lvlMod: 1
                    }
                ],
                desc: 'Can move through zones unseen.',
                extra: ''
            }
        ]
    },
    'Vampire': {
        name: 'Vampire',
        baseStats: {
            HP: 4,
            Attack: 2,
            Defense: 0
        },
        abilities: [
            {   
                name: 'Endulge',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '*',
                        value: 1.25
                    },
                    {
                        name: 'HP',
                        func: '*',
                        value: 1.25,
                    }
                ],
                extra: ''
            },
            {   
                name: 'Feast of Flesh',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'HP',
                        func: '*',
                        value: 1.5
                    }
                ],
                extra: ''
            }
        ]
    },
    'Dark Elf': {
        name: 'Dark Elf',
        baseStats: {
            HP: 0,
            Attack: 6,
            Defense: 0
        },
        abilities: [
            {   
                name: 'Deadly Aim',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'Attack',
                        func: '*',
                        value: 1.5
                    }
                ],
                extra: ''
            },
            {   
                name: 'Sneaky',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'Defense',
                        func: '*',
                        value: 1.5,
                    }
                ],
                extra: ''
            }
        ]
    },
    'Undead': {
        name: 'Undead',
        baseStats: {
            HP: 3,
            Attack: 0,
            Defense: 3
        },
        abilities: [
            {   
                name: 'Death Grip',
                active: false,
                passive: false,
                statMod: [
                    {
                        name: 'Attack',
                        func: '*',
                        value: 1.5
                    },
                    {
                        name: 'Defense',
                        func: '*',
                        value: 0.5,
                    }
                ],
                extra: ''
            },
            {   
                name: 'Rotten Flesh',
                active: true,
                passive: true,
                statMod: [
                    {
                        name: 'HP',
                        func: '*',
                        value: 1.5
                    }
                ],
                extra: ''
            },
        ]
    }
};