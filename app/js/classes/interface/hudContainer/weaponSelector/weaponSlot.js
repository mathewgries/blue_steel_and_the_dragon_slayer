export default class WeaponSlot {
    constructor({ weapon }) {
        this.container = this.buildContainer({ weapon });
        this.weaponDisplay = this.buildWeaponDislplay({ weapon });
        this.container.appendChild(this.weaponDisplay);
    }

    buildContainer({ weapon }) {
        const container = document.createElement('div');
        container.setAttribute('id', `${weapon}-slot`);
        container.classList.add('weapon-slot');
        return container;
    }

    buildWeaponDislplay({ weapon }) {
        const weaponDisplay = document.createElement('div');
        weaponDisplay.classList.add('weapon-slot-display');
        weaponDisplay.setAttribute('id', `${weapon}-slot-display`);
        return weaponDisplay;
    }
}