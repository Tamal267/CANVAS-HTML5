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

let gravity = 1;
let friction = 0.99;

window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

window.addEventListener("resize", () => {
    init();
});

window.addEventListener("click", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Ball {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.stroke();
    }

    update() {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
        if (
            this.x + this.radius + this.dx > canvas.width ||
            this.x - this.radius <= 0
        ) {
            this.dx = -this.dx;
        }
        this.y += this.dy;
        this.x += this.dx;
        this.draw();
    }
}

console.log(canvas.width);

let ballArray = [];

function init() {
    ballArray = [];
    for (let i = 0; i < 500; i++) {
        let radius = utils.randomIntFromRange(8, 20);
        let x = utils.randomIntFromRange(radius, canvas.width - radius);
        let y = utils.randomIntFromRange(0, canvas.height - radius);
        let dx = utils.randomIntFromRange(-2, 2);
        let dy = utils.randomIntFromRange(-2, 2);
        let color = utils.randomColor(colors);
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i of ballArray) {
        i.update();
    }
}

init();
animate();
