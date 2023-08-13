import PotionSlot from "./potionSlot.js";
import { potionData } from "../../../../../data/potionData.js";

export default class PotionSelector {
    constructor() {
        this.container = document.getElementById('potion-selector-container');
        this.potionSlots = this.buildPotionSlots();
    }

    buildPotionSlots() {
        const potionsTypes = Object.keys(potionData);
        return potionsTypes.map((potion) => {
            const element = new PotionSlot({ potion: potionData[potion] });
            this.container.appendChild(element.container);
            return element;
        });
    }

    resize() {
        this.potionSlots.forEach((slot) => slot.resize());
    }
}