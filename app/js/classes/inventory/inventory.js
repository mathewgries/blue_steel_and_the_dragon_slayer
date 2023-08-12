import { Sword, Flail, Axe, Polearm, Mace, Warmhammer } from '../weapons/meleeWeapon.js'
import { Sling, Bow, Crossbow } from '../weapons/rangedWeapon.js'
import { weaponData } from '../../../data/weaponData.js'
import { addWeaponToUI, updateActiveWeaponUI } from './updateUI.js';

export default class Inventory {
    constructor({ canvas }) {
        this.canvas = canvas
        this.ctx = this.canvas.ctx;
        this.weapons = {};
        this.bombs = {
            amount: 0,
            get count() { return this.amount },
            set count(num) { this.amount = num }
        }
        this.potions = {
            health: 0,
            damage: 0,
            defense: 0,
            stamina: 0,
        };
        this.materials = { wood: 0, iron: 0, stone: 0, steel: 0, copper: 0, carbon: 0 };
        this.equippedWeapon = {};
        this.equippedSecondary = null;
        this.equippedPotion = null;

        this.addWeapon({ ...weaponData['sling'].find((x) => x.name === 'sling') })
        this.addWeapon({ ...weaponData['sword'].find((x) => x.name === 'wooden_sword') })
        this.addWeapon({ ...weaponData['bow'].find((x) => x.name === 'wooden_bow') })
        this.addWeapon({ ...weaponData['flail'].find((x) => x.name === 'wooden_flail') })
        this.addWeapon({ ...weaponData['crossbow'].find((x) => x.name === 'wooden_crossbow') })
        this.addWeapon({ ...weaponData['polearm'].find((x) => x.name === 'wooden_polearm') })
        this.addWeapon({ ...weaponData['mace'].find((x) => x.name === 'wooden_mace') })
        this.addWeapon({ ...weaponData['warhammer'].find((x) => x.name === 'wooden_warhammer') })
        this.equipWeapon('sling')
    }

    handleWeaponSelection(keys) {
        if (keys["1"]) {
            this.equipWeapon('sling')
        }
        if (keys["2"]) {
            if (this.weapons['sword']) {
                this.equipWeapon('sword')
            }
        }
        if (keys["3"]) {
            if (this.weapons['bow']) {
                this.equipWeapon('bow')
            }
        }
        if (keys["4"]) {
            if (this.weapons['flail']) {
                this.equipWeapon('flail')
            }
        }
        if (keys["5"]) {
            if (this.weapons['crossbow']) {
                this.equipWeapon('crossbow')
            }
        }
        if (keys["6"]) {
            if (this.weapons['polearm']) {
                this.equipWeapon('polearm')
            }
        }
        if (keys["7"]) {
            if (this.weapons['mace']) {
                this.equipWeapon('mace')
            }
        }
        if (keys["8"]) {
            if (this.weapons['warhammer']) {
                this.equipWeapon('warhammer')
            }
        }
    }

    equipWeapon(type) {
        const newWeapon = this.weapons[type];
        if (newWeapon) {
            updateActiveWeaponUI(this.equippedWeapon.type, newWeapon.type)
            this.equippedWeapon = newWeapon;
        }
    }

    addWeapon({ weaponClass, type, name }) {
        const weapon = weaponData[type].find((x) => x.name === name);
        if (weaponClass === 'range') {
            this.initalizeRangedWeapon({ weapon, type })
        }
        if (weaponClass === 'melee') {
            this.initalizeMeleeWeapon({ weapon, type })
        }
        addWeaponToUI(weapon)
    }

    initalizeRangedWeapon({ weapon, type }) {
        if (weapon.type === 'sling') {
            this.weapons[type] = new Sling({ ...weapon, canvas: this.canvas })
        }
        if (weapon.type === 'bow') {
            this.weapons[type] = new Bow({ ...weapon, canvas: this.canvas })
        }
        if (weapon.type === 'crossbow') {
            this.weapons[type] = new Crossbow({ ...weapon, canvas: this.canvas })
        }
    }

    initalizeMeleeWeapon({ weapon, type }) {
        if (weapon.type === 'sword') {
            this.weapons[type] = new Sword({ ...weapon, canvas: this.canvas })
        }
        if (weapon.type === 'flail') {
            this.weapons[type] = new Flail({ ...weapon, canvas: this.canvas })
        }
        if (weapon.type === 'polearm') {
            this.weapons[type] = new Polearm({ ...weapon, canvas: this.canvas })
        }
        if (weapon.type === 'mace') {
            this.weapons[type] = new Mace({ ...weapon, canvas: this.canvas })
        }
        if (weapon.type === 'warhammer') {
            this.weapons[type] = new Warmhammer({ ...weapon, canvas: this.canvas })
        }
    }

    update(keys) {
        this.handleWeaponSelection(keys)
    }
}