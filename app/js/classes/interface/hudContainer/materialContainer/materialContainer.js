import MaterialSlot from "./materialSlot.js";
import { materialData } from "../../../../../data/materialData.js";

export default class MaterialContainer {
    constructor({ width, height }) {
        this.container = document.getElementById('material-container');
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
        this.materialSlots.forEach((slot) => slot.resize({ width, height }))
    }

    update() {

    }
}