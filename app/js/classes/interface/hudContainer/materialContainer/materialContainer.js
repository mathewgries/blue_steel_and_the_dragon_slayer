import MaterialSlot from "./materialSlot.js";
import { materialData } from "../../../../../data/materialData.js";

export default class MaterialContainer {
    constructor() {
        this.container = document.getElementById('material-container');
        this.labelContainer = document.createElement('div');
        this.labelContainer.setAttribute('id', 'material-label-container');
        this.label = document.createElement('p');
        this.label.innerText = 'Materials';
        this.materialListContainer = document.createElement('div');
        this.materialListContainer.setAttribute('id', 'material-list-container');
        this.labelContainer.appendChild(this.label);
        this.container.appendChild(this.labelContainer);
        this.container.appendChild(this.materialListContainer);
        this.materialSlots = this.buildMaterialSlots();
    }

    buildMaterialSlots() {
        const materialTypes = Object.keys(materialData);
        return materialTypes.map((material) => {
            const element = new MaterialSlot({ material: materialData[material] });
            this.materialListContainer.appendChild(element.container);
            return element;
        });
    }

    resize() {
        const height = this.labelContainer.offsetHeight - (this.labelContainer.offsetHeight / 4);
        this.labelContainer.style.fontSize = `${height}px`;
        this.materialSlots.forEach((slot) => slot.resize());
    }
}