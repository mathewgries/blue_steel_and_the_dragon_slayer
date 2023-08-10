export function addWeaponToUI(weapon) {
    const slot = document.getElementById(`${weapon.name}-slot-display`);
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('weapon-image-container');
    const img = document.createElement('img');
    img.src = `../../assets/images/weapons/${weapon.icon}`;
    const durabilityContainer = document.createElement('div');
    durabilityContainer.classList.add('weapon-durability-container');
    const durabilityMeter = document.createElement('div');
    durabilityMeter.classList.add('weapon-durability-meter');
    const durabilityMeterFill = document.createElement('div');
    durabilityMeterFill.classList.add('weapon-durability-meter-fill');
    durabilityMeterFill.style.width = '100%';
    durabilityMeterFill.style.height = '100%';
    durabilityMeterFill.style.backgroundColor = 'lightgreen';
    imgContainer.appendChild(img);
    slot.appendChild(imgContainer);
    durabilityContainer.appendChild(durabilityMeter);
    durabilityMeter.appendChild(durabilityMeterFill);
    slot.appendChild(durabilityContainer);
}

export function updateActiveWeaponUI(currentWeaponType, newWeaponType) {
    if (currentWeaponType) {
        document.getElementById(`${currentWeaponType}-slot-display`).classList.remove('equipped-weapon')
    }
    document.getElementById(`${newWeaponType}-slot-display`).classList.add('equipped-weapon')
}