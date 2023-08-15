import PotionSlot from "./potionSlot.js";
import { potionData } from "../../../../../data/potionData.js";

export default class PotionSelector {
    constructor() {
        this.container = this.buildContainer();
        this.labelContainer = this.buildLabelContainer();
        this.potionListContainer = this.buildListContainer()
        this.container.appendChild(this.labelContainer);
        this.container.appendChild(this.potionListContainer);
        this.potionSlots = this.buildPotionSlots();
    }

    buildContainer() {
        return document.getElementById('potion-selector-container');
    }

    buildLabelContainer() {
        const labelContainer = document.createElement('div');
        labelContainer.setAttribute('id', 'potion-label-container');
        const label = document.createElement('p');
        label.innerText = 'Potions';
        labelContainer.appendChild(label);
        return labelContainer;
    }

    buildListContainer() {
        const listContainer = document.createElement('div');
        listContainer.setAttribute('id', 'potion-list-container');
        return listContainer;
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