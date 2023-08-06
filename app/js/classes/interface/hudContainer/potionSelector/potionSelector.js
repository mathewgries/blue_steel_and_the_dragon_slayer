import PotionSlot from "./potionSlot.js";
import { potionData } from "../../../../../data/potionData.js";

export default class PotionSelector {
    constructor({ width, height }) {
        this.container = document.getElementById('potion-selector-container');
        this.container.style.width = `${width}px`;
        this.container.style.height = '20%';
        this.container.style.display = 'flex';
        this.container.style.alignItems = 'center';
        this.potionSlots = this.buildPotionSlots(width, height)
    }

    buildPotionSlots(width, height) {
        const potionsTypes = Object.keys(potionData)
        return potionsTypes.map((potion) => {
            const element = new PotionSlot({ potion: potionData[potion], width, height });
            this.container.appendChild(element.container);
            return element
        });
    }

    resize({ width, height }) {
        this.container.style.width = `${width}px`;
        this.container.style.height = '20%';
        this.potionSlots.forEach((slot) => slot.resize({ width, height }))
    }

    update({ width, height }) {

    }
}