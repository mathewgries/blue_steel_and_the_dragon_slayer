import SecondaryWeaponSlot from "./secondaryWeaponSlot.js";
import { secondaryWeaponData } from "../../../../../data/secondaryWeaponData.js";

export default class SecondaryWeaponSelector {
    constructor({ width, height }) {
        this.container = document.getElementById('secondary-weapon-selector-container');
        this.weaponSlots = this.buildWeaponSlots(width, height);
    }

    buildWeaponSlots(width, height) {
        const weaponTypes = Object.keys(secondaryWeaponData);
        return weaponTypes.map((weapon) => {
            const element = new SecondaryWeaponSlot({ weapon, width, height });
            this.container.appendChild(element.container);
            return element;
        });
    }
}