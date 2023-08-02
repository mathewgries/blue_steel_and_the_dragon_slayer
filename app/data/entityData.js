// constructor({ xPosition, yPosition, width, height, xSpeed, ySpeed, health, tileSize, ctx })
export const entityData = {
    player: {
        width: 48,
        height: 48,
        xSpeed: 100,
        ySpeed: 100,
        speed: 100,
        health: 60,
        attackDamage: 0,
    },
    zombie: {
        xPosition: 20,
        yPosition: 20,
        width: 48,
        height: 48,
        xSpeed: 50,
        ySpeed: 0,
        speed: 50,
        health: 1,
        attackDamage: 1,
        fillColor: "green"
    }
}