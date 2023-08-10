import WeaponSlot from "./weaponSlot.js";
import { weaponData } from "../../../../../data/weaponData.js";

export default class WeaponSelector {
    constructor({ width, height }) {
        this.container = document.getElementById('weapon-selector-container');
        this.weaponSlots = this.buildWeaponSlots(width, height);
    }

    buildWeaponSlots(width, height) {
        const weaponTypes = Object.keys(weaponData);
        return weaponTypes.map((weapon) => {
            const element = new WeaponSlot({ weapon, width, height });
            this.container.appendChild(element.container);
            return element;
        });
    }

    update({ width, height }) {
        
     }
}