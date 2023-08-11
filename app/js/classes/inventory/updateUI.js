export function addWeaponToUI(weapon) {
    const slot = document.getElementById(`${weapon.type}-slot-display`);
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('weapon-image-container');
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('weapon-image-wrapper');
    const img = document.createElement('img');
    img.src = `../../assets/images/weapons/${weapon.icon}`;
    img.classList.add('weapon-image');
    const durabilityContainer = document.createElement('div');
    durabilityContainer.classList.add('weapon-durability-container');
    const durabilityMeter = document.createElement('div');
    durabilityMeter.classList.add('weapon-durability-meter');
    const durabilityMeterFill = document.createElement('div');
    durabilityMeterFill.classList.add('weapon-durability-meter-fill');
    durabilityMeterFill.style.width = '100%';
    durabilityMeterFill.style.height = '100%';
    durabilityMeterFill.style.backgroundColor = 'lightgreen';

    imgContainer.appendChild(imgWrapper);
    imgWrapper.appendChild(img);
    slot.appendChild(imgContainer);
    durabilityContainer.appendChild(durabilityMeter);
    durabilityMeter.appendChild(durabilityMeterFill);
    slot.appendChild(durabilityContainer);

    const containerHeight = imgContainer.offsetHeight;
    const imageHeight = imgWrapper.offsetHeight;
    img.style.marginTop = `${ ((containerHeight/2) - (imageHeight/2))}px`
}

export function updateActiveWeaponUI(currentWeaponType, newWeaponType) {
    if (currentWeaponType) {
        document.getElementById(`${currentWeaponType}-slot-display`).classList.remove('equipped-weapon')
    }
    document.getElementById(`${newWeaponType}-slot-display`).classList.add('equipped-weapon')
}