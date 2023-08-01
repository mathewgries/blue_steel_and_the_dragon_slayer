// Function to check for collision between two rectangular objects (AABB collision)
function checkAABBCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// Function to check for collision with the canvas edges and return true if there is a collision
function checkCanvasCollision(boundinBox, canvas) {
    let collision = false;
    if (boundinBox.x < 0 || boundinBox.x + boundinBox.width > canvas.width) {
        collision = true; // Horizontal collision detected
    }
    if (boundinBox.y < 0 || boundinBox.y + boundinBox.height > canvas.height) {
        collision = true; // Vertical collision detected
    }
    return collision;
}

// Export the collision detection function
export { checkCanvasCollision, checkAABBCollision };