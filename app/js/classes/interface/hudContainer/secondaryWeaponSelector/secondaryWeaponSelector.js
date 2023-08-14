import SecondaryWeaponSlot from "./secondaryWeaponSlot.js";
import { secondaryWeaponData } from "../../../../../data/secondaryWeaponData.js";

export default class SecondaryWeaponSelector {
    constructor() {
        this.container = document.getElementById('secondary-weapon-selector-container');
        this.labelContainer = document.createElement('div');
        this.labelContainer.setAttribute('id', 'secondary-weapon-label-container');
        this.label = document.createElement('p');
        this.label.innerText = 'Secondary';
        this.weaponListContainer = document.createElement('div');
        this.weaponListContainer.setAttribute('id', 'secondary-weapon-list-container');
        this.labelContainer.appendChild(this.label);
        this.container.appendChild(this.labelContainer);
        this.container.appendChild(this.weaponListContainer);
        this.weaponSlots = this.buildWeaponSlots();
    }

    buildWeaponSlots() {
        const weaponTypes = Object.keys(secondaryWeaponData);
        return weaponTypes.map((weapon) => {
            const element = new SecondaryWeaponSlot({ weapon: secondaryWeaponData[weapon] });
            this.weaponListContainer.appendChild(element.container);
            return element;
        });
    }

    resize() {
        const height = this.labelContainer.offsetHeight - (this.labelContainer.offsetHeight / 4);
        this.labelContainer.style.fontSize = `${height}px`;
        this.weaponSlots.forEach((slot) => slot.resize());
    }
}