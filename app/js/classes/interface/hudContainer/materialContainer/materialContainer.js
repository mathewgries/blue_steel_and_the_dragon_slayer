import MaterialSlot from "./materialSlot.js";
import { materialData } from "../../../../../data/materialData.js";

export default class MaterialContainer {
    constructor({ width, height }) {
        this.container = document.getElementById('material-container');
        this.container.style.width = `${width}px`;
        this.container.style.height = '20%';
        this.container.style.display = 'flex';
        this.container.style.alignItems = 'center';
        this.materialSlots = this.buildMaterialSlots(width, height)
    }

    buildMaterialSlots(width, height) {
        const materialTypes = Object.keys(materialData)
        return materialTypes.map((material) => {
            const element = new MaterialSlot({ material: materialData[material], width, height });
            this.container.appendChild(element.container);
            return element
        });
    }

    resize({ width, height }) {
        this.container.style.width = `${width}px`;
        this.container.style.height = '20%';
        this.materialSlots.forEach((slot) => slot.resize({ width, height }))
    }

    update() {

    }
}