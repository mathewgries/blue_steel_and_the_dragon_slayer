export function updateDurabilityMeter({ percentage, weaponType }) {
    const element = document.getElementById(`${weaponType}-meter-fill`);
    let fillColor = 'lightgreen';
    if (percentage <= 25) {
        fillColor = 'red';
    } else if (percentage <= 50) {
        fillColor = 'orange';
    }

    element.style.backgroundColor = fillColor;
    element.style.width = `${percentage}%`
}