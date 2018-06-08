export const classMap = {
    'Time Priest': {
        name: 'Time Priest',
        equipment: ['Armor', 'Shield', 'Sword'],
        abilities: [
            {   
                name: 'Slow',
                active: true,
                statMod: {
                    name: 'Defense',
                    func: '+',
                    value: 10
                },
                extra: ''
            },
            {   
                name: 'Speed',
                active: true,
                statMod: {
                    name: 'Attack',
                    func: '+',
                    value: 10
                },
                extra: ''
            }
        ]
    },
    'Mechanic': {
        name: 'Mechanic',
        equipment: ['Helmet', 'Armor', 'Shield', 'Spear'],
        abilities: [
            {   
                name: 'Repair',
                active: true,
                statMod: {
                    name: 'Defense',
                    func: '+',
                    value: 10
                },
                extra: ''
            },
            {   
                name: 'Build Weapon',
                active: true,
                statMod: {
                    name: 'Attack',
                    func: '+',
                    value: 10
                },
                extra: ''
            }
        ]
    },
    'Druid': {
        name: 'Druid',
        equipment: ['Armor', 'Spear', 'Bow']
    },
    'Spartan': {
        name: 'Spartan',
        equipment: ['Helmet', 'Armor', 'Shield', 'Spear', 'Sword']
    },
    'Blood Mage': {
        name: 'Blood Mage',
        equipment: ['Armor', 'Sword', 'Bow']
    },
    'Necromancer': {
        name: 'Necromancer',
        equipment: ['Helmet', 'Shield', 'Sword', 'Bow']
    },
    'Knight': {
        name: 'Knight',
        equipment: ['Helmet', 'Armor', 'Shield', 'Sword']
    },
    'Witch': {
        name: 'Witch',
        equipment: ['Shield', 'Spear']
    },
};

export const raceMap = {
    'Angel': {
        name: 'Angel',
        abilities: [
            {   
                name: 'Shield of Virtue',
                active: true,
                statMod: {
                    name: 'Defense',
                    func: '*',
                    value: 2
                },
                extra: ''
            },
            {   
                name: 'Hand of Jesus',
                active: true,
                statMod: {
                    name: 'HP',
                    func: '+',
                    value: 10
                },
                extra: ''
            }
        ]
    },
    'Human': {
        name: 'Human',
        abilities: [
            {   
                name: 'Flesh',
                active: true,
                statMod: {
                    name: 'HP',
                    func: '*',
                    value: 2
                },
                extra: ''
            },
            {   
                name: 'Engineering',
                active: true,
                statMod: {
                    name: 'Attack',
                    func: '*',
                    value: 2
                },
                extra: ''
            }
        ]
    },
    'Elf': {
        name: 'Elf',
        abilities: [
            {   
                name: 'Precision',
                active: true,
                statMod: {
                    name: 'Attack',
                    func: '*',
                    value: 3
                },
                extra: ''
            },
            {   
                name: 'Evasive',
                active: true,
                statMod: {
                    name: 'Defense',
                    func: '*',
                    value: 2
                },
                extra: ''
            }
        ]
    },
    'Robot': {
        name: 'Robot',
        abilities: [
            {   
                name: 'Metallic Plating',
                active: true,
                statMod: {
                    name: 'Defense',
                    func: '*',
                    value: 1.5
                },
                extra: ''
            },
            {   
                name: 'Locked In',
                active: true,
                statMod: {
                    name: 'Attack',
                    func: '*',
                    value: 1.5
                },
                extra: ''
            }
        ]
    },
    'Ghost': {
        name: 'Ghost',
        abilities: [
            {   
                name: 'Transparent',
                active: true,
                statMod: {
                    name: 'Defense',
                    func: '*',
                    value: 2
                },
                extra: ''
            },
            {   
                name: 'Ectoplasm',
                active: true,
                statMod: {
                    name: 'Attack',
                    func: '*',
                    value: 2
                },
                extra: ''
            }
        ]
    },
    'Vampire': {
        name: 'Vampire',
        abilities: [
            {   
                name: 'Life Drain',
                active: true,
                statMod: {
                    name: 'HP',
                    func: '*',
                    value: 3
                },
                extra: ''
            },
            {   
                name: 'Endulge',
                active: true,
                statMod: {
                    name: 'Attack',
                    func: '+',
                    value: 10
                },
                extra: ''
            }
        ]
    },
    'Dark Elf': {
        name: 'Dark Elf',
        abilities: [
            {   
                name: 'Deadly Aim',
                active: true,
                statMod: {
                    name: 'Attack',
                    func: '*',
                    value: 2
                },
                extra: ''
            },
            {   
                name: 'Sneaky',
                active: true,
                statMod: {
                    name: 'Defense',
                    func: '*',
                    value: 2
                },
                extra: ''
            }
        ]
    },
    'Undead': {
        name: 'Undead',
        abilities: [
            {   
                name: 'Rotten Flesh',
                active: true,
                statMod: {
                    name: 'HP',
                    func: '*',
                    value: 3
                },
                extra: ''
            },
            {   
                name: 'Death Grip',
                active: true,
                statMod: {
                    name: 'Attack',
                    func: '*',
                    value: 1.5
                },
                extra: ''
            }
        ]
    }
};