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
        this.potions = { health: 0, stamina: 0, strength: 0 };
        this.materials = { wood: 0, iron: 0, stone: 0, steel: 0, copper: 0, carbon: 0 };
        this.equippedWeapon = {};
        this.equippedSecondary = null;
        this.equippedPotion = null;

        this.addWeapon({ type: 'sling', name: 'sling' })
        this.equipWeapon('sling')
    }

    equipWeapon(weaponName) {
        const newWeapon = this.weapons[weaponName];
        if (newWeapon) {
            updateActiveWeaponUI(this.equippedWeapon.type, newWeapon.type)
            this.equippedWeapon = newWeapon;
        }
    }

    addWeapon({ type, name }) {
        const weapon = weaponData[type].find((x) => x.name);
        this.weapons[name] = this.initalizeWeapon(weapon)
        addWeaponToUI(weapon)
    }

    initalizeWeapon(weapon) {
        if (weapon.name === 'sling') {
            return new Sling({ ...weapon, canvas: this.canvas })
        }
    }

    update(keys, deltaTime) { }
}