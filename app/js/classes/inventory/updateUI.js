export function addWeaponSlotUI({ weapon }) {
    const slot = document.getElementById(`${weapon.type}-slot-display`);
    slot.style.backgroundColor = '#443355';
    const imgContainer = document.createElement('div');
    imgContainer.setAttribute('id', `${weapon.type}-image-container`);
    imgContainer.classList.add('weapon-image-container');
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('weapon-image-wrapper');
    const img = document.createElement('img');
    img.src = `../../assets/images/${weapon.imageFolder}/${weapon.icon}`;
    img.classList.add('weapon-image');
    imgContainer.appendChild(imgWrapper);
    imgWrapper.appendChild(img);
    slot.appendChild(imgContainer);
    const containerHeight = imgContainer.offsetHeight;
    const imageHeight = imgWrapper.offsetHeight;
    img.style.marginTop = `${((containerHeight / 2) - (imageHeight / 2))}px`;
}

export function addDurabilityContainerUI({ weapon }) {
    const slot = document.getElementById(`${weapon.type}-slot-display`);
    const durabilityContainer = document.createElement('div');
    durabilityContainer.classList.add('weapon-durability-container');
    const durabilityMeter = document.createElement('div');
    durabilityMeter.classList.add('weapon-durability-meter');
    const durabilityMeterFill = document.createElement('div');
    durabilityMeterFill.classList.add('weapon-durability-meter-fill');
    durabilityMeterFill.setAttribute('id', `${weapon.type}-meter-fill`);
    durabilityMeterFill.style.width = '100%';
    durabilityMeterFill.style.height = '100%';
    durabilityMeterFill.style.backgroundColor = 'lightgreen';
    durabilityContainer.appendChild(durabilityMeter);
    durabilityMeter.appendChild(durabilityMeterFill);
    slot.appendChild(durabilityContainer);
}

export function addWeaponCountUI({ weapon, count }) {

    const slot = document.getElementById(`${weapon.type}-slot-display`);
    const countContainer = document.createElement('div');
    countContainer.classList.add('weapon-count-container');
    countContainer.setAttribute('id', `${weapon.type}-count-container`);
    countContainer.innerText = count;
    slot.appendChild(countContainer);
}

export function updateActiveWeaponUI({ currentType, newType }) {
    if (currentType) {
        document.getElementById(`${currentType}-slot-display`).classList.remove('equipped-weapon');
    }
    document.getElementById(`${newType}-slot-display`).classList.add('equipped-weapon');
}

export function centerImageToSLotUI({ weapon }) {
    const slot = document.getElementById(`${weapon.type}-slot-display`);
    const imgContainer = document.getElementById(`${weapon.type}-image-container`);
    const slotHeight = slot.offsetHeight;
    const containerHeight = imgContainer.offsetHeight;
    imgContainer.style.marginTop = `${((slotHeight / 2) - (containerHeight / 2)) / 2}px`;
}