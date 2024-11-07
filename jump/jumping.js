const player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");

const gravity = 0.5;
const jumpPower = 10;
const wallJumpPower = 12;
const moveSpeed = 5;
const wallDetectionRange = 10;  // The range at which the player is considered to be "touching" the wall

let playerX = gameContainer.offsetWidth / 2 - player.offsetWidth / 2;
let playerY = gameContainer.offsetHeight - player.offsetHeight;
let velocityX = 0;
let velocityY = 0;
let onGround = false;
let canDoubleJump = true;
let isTouchingWall = false;
let wallDirection = 0; // 1 for right, -1 for left, 0 for none

let keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") keys.up = true;
    if (e.key === "ArrowDown") keys.down = true;
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowRight") keys.right = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") keys.up = false;
    if (e.key === "ArrowDown") keys.down = false;
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
});

function detectWalls() {
    const playerLeft = playerX;
    const playerRight = playerX + player.offsetWidth;
    const playerBottom = playerY;
    const playerTop = playerY + player.offsetHeight;

    isTouchingWall = false;
    wallDirection = 0;

    // Check for wall collision on the left
    if (playerLeft <= wallDetectionRange) {
        isTouchingWall = true;
        wallDirection = -1;
    }

    // Check for wall collision on the right
    if (playerRight >= gameContainer.offsetWidth - wallDetectionRange) {
        isTouchingWall = true;
        wallDirection = 1;
    }
}

function update() {
    detectWalls();
    if (keys.left) {
        velocityX = -moveSpeed;
    } else if (keys.right) {
        velocityX = moveSpeed;
    } else {
        velocityX = 0;
    }

    // Handle jumping
    if (keys.up && gameContainer.offsetHeight - playerY + 130 < window.innerHeight) {
        if (onGround) {
            // Normal jump
            velocityY = -jumpPower;
            canDoubleJump = true; // Reset double jump
        } else if (canDoubleJump) {
            // Double jump
            velocityY = -jumpPower;
            canDoubleJump = false; // Disable double jump
        } else if (isTouchingWall) {
            // Wall jump: apply vertical and horizontal movement
            velocityY = -wallJumpPower; // Jump upwards
            velocityX = wallDirection * moveSpeed; // Jump away from the wall
            canDoubleJump = true; // Allow double jump after wall jump
            onGround = false; // Reset on ground status
        }
    }

    // Apply gravity
    velocityY += gravity;

    // Update position
    playerX += velocityX;
    playerY += velocityY;

    // Collision with the ground
    if (playerY + player.offsetHeight > gameContainer.offsetHeight) {
        playerY = gameContainer.offsetHeight - player.offsetHeight;
        velocityY = 0;
        onGround = true;
        canDoubleJump = true; // Reset double jump after landing
    }

    // Prevent going out of bounds horizontally
    if (playerX < 0) playerX = 0;
    if (playerX + player.offsetWidth > gameContainer.offsetWidth) playerX = gameContainer.offsetWidth - player.offsetWidth;

    // Apply new position
    player.style.left = `${playerX}px`;
    player.style.bottom = `${gameContainer.offsetHeight - playerY}px`;

    requestAnimationFrame(update);
}

update();
