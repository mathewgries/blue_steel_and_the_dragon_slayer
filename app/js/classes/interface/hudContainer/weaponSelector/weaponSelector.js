import WeaponSlot from "./weaponSlot.js";
import { weaponData } from "../../../../../data/weaponData.js";

export default class WeaponSelector {
    constructor() {
        this.container = document.getElementById('weapon-selector-container');
        this.labelContainer = document.createElement('div');
        this.labelContainer.setAttribute('id', 'weapon-label-container');
        this.label = document.createElement('p');
        this.label.innerText = 'Weapons';
        this.weaponListContainer = document.createElement('div');
        this.weaponListContainer.setAttribute('id', 'weapon-list-container');
        this.labelContainer.appendChild(this.label);
        this.container.appendChild(this.labelContainer);
        this.container.appendChild(this.weaponListContainer);
        this.weaponSlots = this.buildWeaponSlots();
    }

    buildWeaponSlots() {
        const weaponTypes = Object.keys(weaponData);
        return weaponTypes.map((weapon) => {
            const element = new WeaponSlot({ weapon });
            this.weaponListContainer.appendChild(element.container);
            return element;
        });
    }

    resize() {
        const height = this.labelContainer.offsetHeight - (this.labelContainer.offsetHeight / 4);
        this.labelContainer.style.fontSize = `${height}px`;
    }
}