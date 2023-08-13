import MaterialSlot from "./materialSlot.js";
import { materialData } from "../../../../../data/materialData.js";

export default class MaterialContainer {
    constructor() {
        this.container = document.getElementById('material-container');
        this.materialSlots = this.buildMaterialSlots();
    }

    buildMaterialSlots() {
        const materialTypes = Object.keys(materialData);
        return materialTypes.map((material) => {
            const element = new MaterialSlot({ material: materialData[material] });
            this.container.appendChild(element.container);
            return element;
        });
    }

    resize() {
        this.materialSlots.forEach((slot) => slot.resize());
    }
}