// Function to check for collision between two rectangular objects (AABB collision)
function checkAABBCollision(bounds1, bounds2) {
    return (
        bounds1.left < bounds2.right &&
        bounds1.right > bounds2.left &&
        bounds1.top < bounds2.bottom &&
        bounds1.bottom > bounds2.top
    );
}

// Function to check for collision with the canvas edges and return true if there is a collision
function checkCanvasCollision(bounds, canvas) {
    let collision = false;
    if (bounds.left < 0 || bounds.right > canvas.width) {
        collision = true; // Horizontal collision detected
    }
    if (bounds.top < 0 || bounds.bottom > canvas.height) {
        collision = true; // Vertical collision detected
    }
    return collision;
}

// Export the collision detection function
export { checkCanvasCollision, checkAABBCollision };