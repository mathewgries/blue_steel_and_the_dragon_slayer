import WeaponSlot from "./weaponSlot.js";
import { weaponsData } from "../../../../../data/weaponsData.js";

export default class WeaponSelector {
    constructor({ width, height }) {
        this.container = document.getElementById('weapon-selector-container');
        this.container.style.width = `${width}px`;
        this.container.style.height = '45%';
        this.container.style.display = 'flex';
        this.container.style.flexWrap = 'wrap';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';
        this.weaponSlots = this.buildWeaponSlots(width, height);
    }

    buildWeaponSlots(width, height) {
        const weaponTypes = Object.keys(weaponsData)
        return weaponTypes.map((weapon) => {
            const element = new WeaponSlot({ weapon, width, height });
            this.container.appendChild(element.container);
            return element
        });
    }

    resize({ width, height }) {
        this.container.style.width = `${width}px`;
        this.container.style.height = '45%';
        this.weaponSlots.forEach((slot) => slot.resize({ width, height }))
    }

    update({ width, height }) {

    }
}