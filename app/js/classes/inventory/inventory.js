import { Sword, Flail, Axe, Polearm, Mace, Warmhammer } from '../weapons/meleeWeapon.js'
import { Sling, Bow, Crossbow } from '../weapons/rangedWeapon.js'
import weaponsData from '../../../data/weaponsData.js'

class Inventory {
    constructor() {
        this.weapons = {
            sling: new Sling(weaponsData.sling)
        };
        this.bombs = {
            amount: 0,
            get count() { return this.amount },
            set count(num) { this.amount = num }
        }
        this.potions = { health: 0, stamina: 0, strength: 0 };
        this.materials = { wood: 0, iron: 0, stone: 0, steel: 0, copper: 0, carbon: 0 };
        this.equippedWeapon = null;
        this.equippedSecondary = null;
        this.equippedPotion = null;

        this.equipWeapon('sling')
        this.updateWeaponSelectorUI()
    }

    equipWeapon(weaponType) {
        const weapon = this.weapons[weaponType];
        if (weapon) {
            this.equippedWeapon = weapon;
            console.log(`Equipped ${weaponType}`)
        } else {
            console.log(`You don't have a ${weaponType} to equip.`)
        }
    }

    updateWeaponSelectorUI() {
        const weaponSlotsArray = this.getWeaponSlots()

        weaponSlotsArray.forEach((weaponSlot) => {
            weaponSlot.innerHTML = "";
            const weaponName = weaponSlot.id.replace("-slot", "")
            const weapon = this.weapons[weaponName]
            const weaponContainer = document.createElement("div")
            weaponContainer.classList.add("weapon-container")

            if (weapon) {
                this.updateCollectedWeaponSlot(weapon, weaponContainer)
                if (weapon === this.equippedWeapon) {
                    weaponContainer.classList.add('equipped-weapon')
                }
            }
            weaponSlot.appendChild(weaponContainer);
        })
    }

    getWeaponSlots() {
        const weaponSelector = document.getElementById('weapon-selector')
        const weaponSlots = weaponSelector.getElementsByClassName('weapon-slot');
        return Array.from(weaponSlots);
    }

    updateCollectedWeaponSlot(weapon, weaponContainer) {
        this.updateWeaponSlotImage(weapon, weaponContainer)
        this.updateWeaponSlotName(weapon, weaponContainer)
        this.updateDurabilityMeter(weapon, weaponContainer)
    }

    updateWeaponSlotImage(weapon, weaponContainer) {
        const weaponImageContainer = document.createElement("div");
        weaponImageContainer.classList.add("weapon-image-container");
        const img = document.createElement("img");
        img.src = `../assets/images/weapons/${weapon.icon}`;
        img.alt = `${weapon.name} Icon`;
        weaponImageContainer.appendChild(img);
        weaponContainer.appendChild(weaponImageContainer);
    }

    updateWeaponSlotName(weapon, weaponContainer) {
        const weaponNameContainer = document.createElement("div");
        weaponNameContainer.classList.add("weapon-name-container");
        weaponNameContainer.textContent = weapon.name;
        weaponContainer.appendChild(weaponNameContainer);
    }

    updateDurabilityMeterContainer(weapon, weaponContainer) {
        const durabilityContainer = document.createElement("div");
        durabilityContainer.classList.add("durability-container");
        const durabilityMeter = document.createElement("div");
        durabilityMeter.classList.add("durability-meter");
        durabilityContainer.appendChild(durabilityMeter);
        const durabilityMeterFill = document.createElement("div");
        durabilityMeterFill.classList.add("durability-meter-fill")
        durabilityMeter.appendChild(durabilityMeterFill);
        const meterBarWidth  = 50;
        const durabilityPercentage = ((weapon.durability / weapon.maxDurability) * meterBarWidth);
        durabilityMeterFill.style.width = `${durabilityPercentage}px`;
        if (durabilityPercentage <= (meterBarWidth/4)) {
            durabilityMeterFill.style.backgroundColor = "red";
        } else if (durabilityPercentage <= (meterBarWidth/2)) {
            durabilityMeterFill.style.backgroundColor = "orange";
        } else {
            durabilityMeterFill.style.backgroundColor = "green";
        }
        weaponContainer.appendChild(durabilityContainer);
    }

    update(keys, deltaTime) {

    }
}

export { Inventory }