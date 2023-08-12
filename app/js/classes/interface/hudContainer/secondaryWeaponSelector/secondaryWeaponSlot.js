export default class SecondaryWeaponSlot {
    constructor({ weapon, width, height }) {
        this.container = document.createElement('div');
        this.container.setAttribute('id', `${weapon}-slot`);
        this.container.classList.add('secondary-weapon-slot')

        this.weaponDisplay = document.createElement('div')
        this.weaponDisplay.classList.add('secondary-weapon-slot-display')
        this.weaponDisplay.setAttribute('id', `${weapon}-slot-display`);

        this.container.appendChild(this.weaponDisplay);
    }
}