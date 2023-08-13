// constructor({ xPosition, yPosition, width, height, xSpeed, ySpeed, health, tileSize, ctx })
export const entityData = {
    player: {
        baseWidth: 16,
        baseHeight: 16,
        xSpeed: 50,
        ySpeed: 50,
        speed: 50,
        health: 60,
        attackDamage: 0,
        stamina: 100,
    },
    zombie: {
        xPosition: 20,
        yPosition: 20,
        baseWidth: 16,
        baseHeight: 16,
        xSpeed: 50,
        ySpeed: 0,
        speed: 50,
        health: 50,
        attackDamage: 1,
        fillColor: "green"
    }
}