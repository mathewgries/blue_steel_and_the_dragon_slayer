import StatusBur from "./statusBar/statusBar.js";
import WeaponSelector from "./weaponSelector/weaponSelector.js";
import PotionSelector from "./potionSelector/potionSelector.js";
import MaterialContainer from "./materialContainer/materialContainer.js";

export default class HudContainer {
    constructor({ width, height, diff }) {
        this.container = document.getElementById('hud-container');
        this.borderSize = 2;
        this.widthOffset = this.borderSize + (this.borderSize / 2) + 3;
        this.heightOffset = this.borderSize * 2
        this.dimensions = { width: diff - this.widthOffset, height: height - this.heightOffset };
        this.aspectRatio = this.dimensions.width / this.dimensions.height;
        this.container.style.border = `${this.borderSize}px solid black`;
        this.container.style.borderLeft = `${this.borderSize / 2}px solid black`;
        this.container.style.backgroundColor = 'lightseagreen';
        this.container.style.width = `${this.dimensions.width}px`;
        this.container.style.height = `${this.dimensions.height}px`;
        this.statusBar = new StatusBur({ ...this.dimensions });
        this.weaponSelector = new WeaponSelector({ ...this.dimensions })
        this.potionSelector = new PotionSelector({ ...this.dimensions })
        this.materialContainer = new MaterialContainer({ ...this.dimensions })
    }

    resize({ height, diff }) {
        this.dimensions = { width: diff - this.widthOffset, height: height - this.heightOffset };
        this.container.style.width = `${this.dimensions.width}px`;
        this.container.style.height = `${this.dimensions.height}px`;
        this.statusBar.resize({ ...this.dimensions });
        this.weaponSelector.resize({ ...this.dimensions })
        this.potionSelector.resize({ ...this.dimensions })
        this.materialContainer.resize({ ...this.dimensions })
    }

    update({ height, diff }) {

    }
}