export default class SecondaryWeaponSlot {
    constructor({ weapon }) {
        this.type = weapon.type;
        this.container = document.createElement('div');
        this.container.setAttribute('id', `${weapon.type}-slot`);
        this.container.classList.add('secondary-weapon-slot');
        this.weaponDisplay = document.createElement('div');
        this.weaponDisplay.classList.add('secondary-weapon-slot-display');
        this.weaponDisplay.setAttribute('id', `${weapon.type}-slot-display`);
        this.container.appendChild(this.weaponDisplay);
    }

    resize() {
        const element = document.getElementById(`${this.type}-count-container`);
        if (element) {
            element.style.fontSize = `${element.offsetHeight}px`;
        }
    }
}