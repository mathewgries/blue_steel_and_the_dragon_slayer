import SecondaryWeaponSlot from "./secondaryWeaponSlot.js";
import { secondaryWeaponData } from "../../../../../data/secondaryWeaponData.js";

export default class SecondaryWeaponSelector {
    constructor() {
        this.container = document.getElementById('secondary-weapon-selector-container');
        this.weaponSlots = this.buildWeaponSlots();
    }

    buildWeaponSlots() {
        const weaponTypes = Object.keys(secondaryWeaponData);
        return weaponTypes.map((weapon) => {
            const element = new SecondaryWeaponSlot({ weapon: secondaryWeaponData[weapon] });
            this.container.appendChild(element.container);
            return element;
        });
    }

    resize() {
        this.weaponSlots.forEach((slot) => slot.resize());
    }
}