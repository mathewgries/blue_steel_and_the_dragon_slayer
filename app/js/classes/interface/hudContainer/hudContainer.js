import StatusContainer from "./statusBar/statusContainer.js";
import WeaponSelector from "./weaponSelector/weaponSelector.js";
import SecondaryWeaponSelector from "./secondaryWeaponSelector/secondaryWeaponSelector.js";
import PotionSelector from "./potionSelector/potionSelector.js";
import MaterialContainer from "./materialContainer/materialContainer.js";

export default class HudContainer {
    constructor({ height, diff }) {
        this.container = document.getElementById('hud-container');
        this.borderSize = 2;
        this.widthOffset = this.borderSize + (this.borderSize / 2) + 3;
        this.heightOffset = this.borderSize * 2;
        this.dimensions = {
            width: Math.floor(diff - this.widthOffset),
            height: Math.floor(height - this.heightOffset)
        };
        this.aspectRatio = this.dimensions.width / this.dimensions.height;
        this.statusBar = new StatusContainer();
        this.weaponSelector = new WeaponSelector();
        this.secondaryWeaponSelector = new SecondaryWeaponSelector();
        this.potionSelector = new PotionSelector({ ...this.dimensions });
        this.materialContainer = new MaterialContainer({ ...this.dimensions });
    }

    resize({ height, diff }) {
        this.setDimension({ height, diff });
        this.resizeContainer();
        this.resizeDependents();
    }

    setDimension({ height, diff }) {
        this.dimensions = {
            width: Math.floor(diff - this.widthOffset),
            height: Math.floor(height - this.heightOffset)
        };
    }

    resizeContainer() {
        this.container.style.width = `${this.dimensions.width}px`;
        this.container.style.height = `${this.dimensions.height}px`;
    }

    resizeDependents() {
        this.statusBar.resize();
        this.weaponSelector.resize();
        this.secondaryWeaponSelector.resize();
        this.potionSelector.resize();
        this.materialContainer.resize();
    }
}