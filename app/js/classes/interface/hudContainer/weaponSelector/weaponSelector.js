import WeaponSlot from "./weaponSlot.js";
import { weaponData } from "../../../../../data/weaponData.js";

export default class WeaponSelector {
    constructor() {
        this.container = this.buildContainer();
        this.labelContainer = this.buildLabelContainer();
        this.weaponListContainer = this.buildListContainer();

        this.container.appendChild(this.labelContainer);
        this.container.appendChild(this.weaponListContainer);
        this.weaponSlots = this.buildWeaponSlots();
    }

    buildContainer(){
        return document.getElementById('weapon-selector-container');
    }

    buildLabelContainer(){
        const labelContainer = document.createElement('div');
        labelContainer.setAttribute('id', 'weapon-label-container');
        const label = document.createElement('p');
        label.innerText = 'Weapons';
        labelContainer.appendChild(label);
        return labelContainer;
    }

    buildListContainer(){
        const listContainer = document.createElement('div');
        listContainer.setAttribute('id', 'weapon-list-container');
        return listContainer;
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