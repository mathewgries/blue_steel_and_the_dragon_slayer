import PotionSlot from "./potionSlot.js";
import { potionData } from "../../../../../data/potionData.js";

export default class PotionSelector {
    constructor() {
        this.container = document.getElementById('potion-selector-container');
        this.labelContainer = document.createElement('div');
        this.labelContainer.setAttribute('id', 'potion-label-container');
        this.label = document.createElement('p');
        this.label.innerText = 'Potions';
        this.potionListContainer = document.createElement('div');
        this.potionListContainer.setAttribute('id', 'potion-list-container');
        this.labelContainer.appendChild(this.label);
        this.container.appendChild(this.labelContainer);
        this.container.appendChild(this.potionListContainer);
        this.potionSlots = this.buildPotionSlots();
    }

    buildPotionSlots() {
        const potionsTypes = Object.keys(potionData);
        return potionsTypes.map((potion) => {
            const element = new PotionSlot({ potion: potionData[potion] });
            this.potionListContainer.appendChild(element.container);
            return element;
        });
    }

    resize() {
        const height = this.labelContainer.offsetHeight - (this.labelContainer.offsetHeight / 4);
        this.labelContainer.style.fontSize = `${height}px`;
        this.potionSlots.forEach((slot) => slot.resize());
    }
}