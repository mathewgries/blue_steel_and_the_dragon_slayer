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

        this.addWeapon({ type: 'sling', name: 'sling' })
        this.addWeapon({type: 'sword', name: 'wooden_sword'})
        this.equipWeapon('sling')
    }

    handleWeaponSelection(keys) {
        if (keys["1"]) {
            this.equipWeapon("sling")
        }
        if (keys["2"]) {
            if (this.weapons['sword']) {
                this.equipWeapon('sword')
            }
        }
        if (keys["3"]) {
            if (this.weapons['bow']) {
                this.equipWeapon("bow")
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

    addWeapon({ type, name }) {
        const weapon = weaponData[type].find((x) => x.name);
        this.weapons[type] = this.initalizeWeapon(weapon)
        addWeaponToUI(weapon)
    }

    initalizeWeapon(weapon) {
        if (weapon.type === 'sling') {
            return new Sling({ ...weapon, canvas: this.canvas })
        }
        if (weapon.type === 'sword') {
            return new Sword({ ...weapon, reach: weapon.reach, canvas: this.canvas })
        }
    }

    update(keys) {
        this.handleWeaponSelection(keys)
    }
}