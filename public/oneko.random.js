
// oneko.js: https://github.com/adryd325/oneko.js

(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (isReducedMotion) return;

  const nekoEl = document.createElement("div");

  let nekoPosX = Math.floor(Math.random() * (window.innerWidth - 64)) + 32;
  let nekoPosY = Math.floor(Math.random() * (window.innerHeight - 64)) + 32;

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;
  let movementTimer = 0;
  let waitTimer = 0;
  let isWaiting = false;

  const nekoSpeed = 10;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  function init() {
    nekoEl.id = "oneko";
    nekoEl.ariaHidden = true;
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "auto";
    nekoEl.style.cursor = "grab";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = 2147483647;
    nekoEl.style.backgroundColor = "transparent";

    let nekoFile = "./oneko.gif";
    const curScript = document.currentScript;
    if (curScript && curScript.dataset.cat) {
      nekoFile = curScript.dataset.cat;
    }
    nekoEl.style.backgroundImage = `url(${nekoFile})`;A

    document.body.appendChild(nekoEl);
    enableDragging();
    window.requestAnimationFrame(onAnimationFrame);
  }

  let lastFrameTimestamp;
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  function enableDragging() {
    nekoEl.addEventListener("mousedown", (e) => {
      isDragging = true;
      nekoEl.style.cursor = "grabbing";
      dragOffsetX = e.clientX - nekoPosX;
      dragOffsetY = e.clientY - nekoPosY;
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      nekoPosX = e.clientX - dragOffsetX;
      nekoPosY = e.clientY - dragOffsetY;
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;

    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      nekoEl.style.cursor = "grab";
    });
  }

  function onAnimationFrame(timestamp) {
    if (!nekoEl.isConnected) return;
    if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp;
      if (!isDragging) frame();
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px \${sprite[1] * 32}px`;
  }

  function frame() {
    frameCount++;
    if (isWaiting) {
      waitTimer--;
      if (waitTimer <= 0) {
        isWaiting = false;
        movementTimer = Math.floor(Math.random() * 30) + 20;
        randomDirection();
      } else {
        idle();
        return;
      }
    } else {
      movementTimer--;
      if (movementTimer <= 0) {
        isWaiting = true;
        waitTimer = Math.floor(Math.random() * 60) + 30;
        return;
      }
    }

    nekoPosX += Math.cos(directionAngle) * nekoSpeed;
    nekoPosY += Math.sin(directionAngle) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;

    const dir = getDirectionFromAngle(directionAngle);
    setSprite(dir, frameCount);
  }

  function idle() {
    setSprite("idle", 0);
  }

  function getDirectionFromAngle(angle) {
    const deg = (angle * 180) / Math.PI;
    if (deg >= -22.5 && deg < 22.5) return "E";
    if (deg >= 22.5 && deg < 67.5) return "SE";
    if (deg >= 67.5 && deg < 112.5) return "S";
    if (deg >= 112.5 && deg < 157.5) return "SW";
    if (deg >= 157.5 || deg < -157.5) return "W";
    if (deg >= -157.5 && deg < -112.5) return "NW";
    if (deg >= -112.5 && deg < -67.5) return "N";
    if (deg >= -67.5 && deg < -22.5) return "NE";
    return "E";
  }

  let directionAngle = Math.random() * 2 * Math.PI;
  function randomDirection() {
    directionAngle = Math.random() * 2 * Math.PI;
  }

  init();
})();
