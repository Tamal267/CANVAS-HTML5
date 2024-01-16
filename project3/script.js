let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};

let utils = {};

utils.randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

utils.randomColor = (colors) => {
    return colors[Math.floor(Math.random() * colors.length)];
};

utils.distance = (x1, y1, x2, y2) => {
    const XD = x2 - x1;
    const YD = y2 - y1;
    return Math.sqrt(XD * XD + YD * YD);
};

let colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.X = x;
        this.y = y;
        this.Y = y;
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI;
        this.velocity = 0.05;
        this.distanceFromCenter = utils.randomIntFromRange(50, 120);
        this.lastMouse = {
            x: x,
            y: y,
        };
    }

    draw(lastPoint) {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }

    update() {
        const lastPoint = {
            x: this.x,
            y: this.y,
        };
        this.radians += this.velocity;

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        this.x =
            this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y =
            this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    }
}

let particles = [];

function init() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        const radius = Math.random() * 2 + 1;
        particles.push(
            new Particle(
                canvas.width / 2,
                canvas.height / 2,
                radius,
                utils.randomColor(colors)
            )
        );
    }
    console.log(particles);
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(255, 255, 255, 0.05)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();
    });
}

init();
animate();
