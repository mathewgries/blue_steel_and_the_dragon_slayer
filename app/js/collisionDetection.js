function checkAABBCollision(rect1, rect2) {
    // Function to check for collision between two rectangular objects (AABB collision)
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function checkCanvasCollision(entity, canvas) {
    // Function to check for collision with the canvas edges and return true if there is a collision
    let collision = false;
    if (entity.x < 0 || entity.x + entity.width > canvas.width) {
        // Horizontal collision detected
        collision = true;
    }
    if (entity.y < 0 || entity.y + entity.height > canvas.height) {
        // Vertical collision detected
        collision = true;
    }
    return collision;
}

// Export the collision detection function
export { checkCanvasCollision, checkAABBCollision };