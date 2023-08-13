import WeaponSlot from "./weaponSlot.js";
import { weaponData } from "../../../../../data/weaponData.js";

export default class WeaponSelector {
    constructor() {
        this.container = document.getElementById('weapon-selector-container');
        this.weaponSlots = this.buildWeaponSlots();
    }

    buildWeaponSlots() {
        const weaponTypes = Object.keys(weaponData);
        return weaponTypes.map((weapon) => {
            const element = new WeaponSlot({ weapon });
            this.container.appendChild(element.container);
            return element;
        });
    }
}