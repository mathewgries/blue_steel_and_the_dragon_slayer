import SecondaryWeaponSlot from "./secondaryWeaponSlot.js";
import { secondaryWeaponData } from "../../../../../data/secondaryWeaponData.js";

export default class SecondaryWeaponSelector {
    constructor() {
        this.container = this.buildContainer();
        this.labelContainer = this.buildLabel();
        this.weaponListContainer = this.buildListContainer();
        this.container.appendChild(this.labelContainer);
        this.container.appendChild(this.weaponListContainer);
        this.weaponSlots = this.buildWeaponSlots();
    }

    buildContainer(){
        return document.getElementById('secondary-weapon-selector-container');
    }

    buildLabel(){
        const labelContainer = document.createElement('div');
        labelContainer.setAttribute('id', 'secondary-weapon-label-container');
        const label = document.createElement('p');
        label.innerText = 'Secondary';
        labelContainer.appendChild(label);
        return labelContainer;
    }

    buildListContainer(){
        const listContainer = document.createElement('div');
        listContainer.setAttribute('id', 'secondary-weapon-list-container');
        return listContainer;
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