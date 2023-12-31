import { Sword, Flail, Axe, Polearm, Mace, Warmhammer } from '../weapons/meleeWeapon.js';
import { Sling, Bow, Crossbow } from '../weapons/rangedWeapon.js';
import Bomb from '../secondaryWeapons/bomb.js';
import Grapple from '../secondaryWeapons/grapple.js';
import Shovel from '../secondaryWeapons/shovel.js';
import { weaponData } from '../../../data/weaponData.js';
import {
    addWeaponSlotUI,
    addDurabilityContainerUI,
    addWeaponCountUI,
    updateActiveWeaponUI,
    centerImageToSLotUI,
    updatePotionCountUI,
    updateMaterialCountUI,
    updateBombCountUI
} from './updateUI.js';
import { secondaryWeaponData } from '../../../data/secondaryWeaponData.js';

export default class Inventory {
    constructor({ canvas }) {
        this.canvas = canvas;
        this.ctx = this.canvas.ctx;
        this.weapons = {};
        this.equippedWeapon = {};
        this.secondaryWeapons = {}
        this.equippedSecondary = {};
        this.bombs = 0;
        this.maxBombs = 4;
        this.potions = { health: 0, damage: 0, defense: 0, stamina: 0 };
        this.equippedPotion = null;
        this.materials = { wood: 0, iron: 0, stone: 0, steel: 0, copper: 0, carbon: 0 };

        this.addWeapon({ ...weaponData['sling'].find((x) => x.name === 'sling') });
        this.addWeapon({ ...weaponData['sword'].find((x) => x.name === 'wooden_sword') });
        this.addWeapon({ ...weaponData['bow'].find((x) => x.name === 'wooden_bow') });
        this.addWeapon({ ...weaponData['flail'].find((x) => x.name === 'wooden_flail') });
        this.addWeapon({ ...weaponData['crossbow'].find((x) => x.name === 'wooden_crossbow') });
        this.addWeapon({ ...weaponData['polearm'].find((x) => x.name === 'wooden_polearm') });
        this.addWeapon({ ...weaponData['mace'].find((x) => x.name === 'wooden_mace') });
        this.addWeapon({ ...weaponData['warhammer'].find((x) => x.name === 'wooden_warhammer') });

        this.addSecondaryWeapon({ ...secondaryWeaponData['shovel'] });
        // this.addSecondaryWeapon({ ...secondaryWeaponData['bomb'] });
        // this.addSecondaryWeapon({ ...secondaryWeaponData['grapple'] });

        this.equipWeapon({ type: 'sling' });
        this.equipSecondaryWeapon({ type: 'shovel' });
    }

    //===========================================================================================
    //                                  MAIN WEAPONS
    //===========================================================================================

    addWeapon({ weaponClass, type, name }) {
        const weapon = weaponData[type].find((x) => x.name === name);
        if (weaponClass === 'ranged') {
            this.initalizeRangedWeapon({ weapon, type });
        }
        if (weaponClass === 'melee') {
            this.initalizeMeleeWeapon({ weapon, type });
        }
        addWeaponSlotUI({ weapon });
        addDurabilityContainerUI({ weapon });
    }

    handleWeaponSelection({ keys }) {
        if (keys["1"]) this.equipWeapon({ type: 'sling' });
        if (keys["2"]) this.equipWeapon({ type: 'sword' });
        if (keys["3"]) this.equipWeapon({ type: 'bow' });
        if (keys["4"]) this.equipWeapon({ type: 'flail' });
        if (keys["5"]) this.equipWeapon({ type: 'crossbow' });
        if (keys["6"]) this.equipWeapon({ type: 'polearm' });
        if (keys["7"]) this.equipWeapon({ tyep: 'mace' });
        if (keys["8"]) this.equipWeapon({ type: 'warhammer' });
    }

    equipWeapon({ type }) {
        const newWeapon = this.weapons[type];
        if (newWeapon) {
            updateActiveWeaponUI({ currentType: this.equippedWeapon.type, newType: newWeapon.type });
            this.equippedWeapon = newWeapon;
        }
    }

    initalizeRangedWeapon({ weapon, type }) {
        if (weapon.type === 'sling') {
            this.weapons[type] = new Sling({ ...weapon, canvas: this.canvas });
        }
        if (weapon.type === 'bow') {
            this.weapons[type] = new Bow({ ...weapon, canvas: this.canvas });
        }
        if (weapon.type === 'crossbow') {
            this.weapons[type] = new Crossbow({ ...weapon, canvas: this.canvas });
        }
    }

    initalizeMeleeWeapon({ weapon, type }) {
        if (weapon.type === 'sword') {
            this.weapons[type] = new Sword({ ...weapon, canvas: this.canvas });
        }
        if (weapon.type === 'flail') {
            this.weapons[type] = new Flail({ ...weapon, canvas: this.canvas });
        }
        if (weapon.type === 'polearm') {
            this.weapons[type] = new Polearm({ ...weapon, canvas: this.canvas });
        }
        if (weapon.type === 'mace') {
            this.weapons[type] = new Mace({ ...weapon, canvas: this.canvas });
        }
        if (weapon.type === 'warhammer') {
            this.weapons[type] = new Warmhammer({ ...weapon, canvas: this.canvas });
        }
    }

    //===========================================================================================
    //                                  SECONDARY WEAPONS
    //===========================================================================================

    handleSecondaryWeaponSelection({ keys }) {
        if (keys["e"]) this.equipSecondaryWeapon({ type: 'shovel' });
        if (keys["r"]) this.equipSecondaryWeapon({ type: 'bomb' });
        if (keys["t"]) this.equipSecondaryWeapon({ type: 'grapple' });
        if (keys["y"]) this.equipSecondaryWeapon({ type: 'item4' });
    }

    equipSecondaryWeapon({ type }) {
        const newWeapon = this.secondaryWeapons[type];
        if (newWeapon) {
            updateActiveWeaponUI({ currentType: this.equippedSecondary.type, newType: newWeapon.type });
            this.equippedSecondary = newWeapon;
        }
    }

    addSecondaryWeapon({ type }) {
        const weapon = secondaryWeaponData[type];
        addWeaponSlotUI({ weapon });
        if (type === 'bomb') {
            this.secondaryWeapons[type] = new Bomb({ ...weapon, canvas: this.canvas });
            addWeaponCountUI({ weapon, count: this.bombs });
        }
        if (type === 'grapple') {
            this.secondaryWeapons[type] = new Grapple({ ...weapon, canvas: this.canvas });
            centerImageToSLotUI({ weapon });
        }
        if (type === 'shovel') {
            this.secondaryWeapons[type] = new Shovel({ ...weapon, canvas: this.canvas });
            centerImageToSLotUI({ weapon });
        }
    }

    addBomb() {
        if (!this.secondaryWeapons['bomb']) {
            this.addSecondaryWeapon({ ...secondaryWeaponData['bomb'] });
        }
        this.bombs = Math.min(this.bombs + 4, this.maxBombs);
        updateBombCountUI({ count: this.bombs });
    }

    //===========================================================================================
    //                                  POTIONS
    //===========================================================================================

    usePotion({ potion }) {
        if (this.potions[potion] > 0) {
            this.potions[potion] -= 1
            updatePotionCountUI({ potion, count: this.potions[potion] });
        }
    }

    addPotion({ potion }) {
        this.potions[potion] += 1;
        updatePotionCountUI({ potion, count: this.potions[potion] });
    }

    //===========================================================================================
    //                                  MATERIALS
    //===========================================================================================

    addMaterial({ material }) {
        this.materials[material] += 1;
        updateMaterialCountUI({ material, count: this.materials[material] });
    }

    //===========================================================================================
    //                                  UPDATE
    //===========================================================================================

    update({ keys }) {
        this.handleWeaponSelection({ keys });
        this.handleSecondaryWeaponSelection({ keys });
    }
}