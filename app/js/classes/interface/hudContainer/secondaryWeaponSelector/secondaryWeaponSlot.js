export default class SecondaryWeaponSlot {
    constructor({ weapon }) {
        this.type = weapon.type;
        this.container = this.buildContainer({ type: weapon.type });
        this.weaponDisplay = this.buildWeaponDisplay({ type: weapon.type });
        this.container.appendChild(this.weaponDisplay);
    }

    buildContainer({ type }) {
        const container = document.createElement('div');
        container.setAttribute('id', `${type}-slot`);
        container.classList.add('secondary-weapon-slot');
        return container;
    }

    buildWeaponDisplay({type}){
        const weaponDisplay = document.createElement('div');
        weaponDisplay.classList.add('secondary-weapon-slot-display');
        weaponDisplay.setAttribute('id', `${type}-slot-display`);
        return weaponDisplay;
    }

    resize() {
        const element = document.getElementById(`${this.type}-count-container`);
        if (element) {
            element.style.fontSize = `${element.offsetHeight}px`;
        }
    }
}