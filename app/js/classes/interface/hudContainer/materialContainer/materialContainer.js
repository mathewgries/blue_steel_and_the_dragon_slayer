import MaterialSlot from "./materialSlot.js";
import { materialData } from "../../../../../data/materialData.js";

export default class MaterialContainer {
    constructor() {
        this.container = this.buildContainer();
        this.labelContainer = this.builLabeldContainer();
        this.materialListContainer = this.buildListContainer();
        this.container.appendChild(this.labelContainer);
        this.container.appendChild(this.materialListContainer);
        this.materialSlots = this.buildMaterialSlots();
    }

    buildContainer(){
        return document.getElementById('material-container');
    }

    builLabeldContainer(){
        const labelContainer = document.createElement('div');
        labelContainer.setAttribute('id', 'material-label-container');
        const label = document.createElement('p');
        label.innerText = 'Materials';
        labelContainer.appendChild(label);
        return labelContainer;
    }

    buildListContainer(){
        const materialListContainer = document.createElement('div');
        materialListContainer.setAttribute('id', 'material-list-container');
        return materialListContainer;
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