let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let mouse = {
    x: undefined,
    y: undefined,
};

window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

let colorArray = ["#756AB6", "#B19470", "#B4D4FF", "#3887BE", "#424769"];

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.minRadius = this.radius;
    this.maxRadius = 40;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.strokeStyle = "black";
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = () => {
        if (
            this.x + this.radius > window.innerWidth ||
            this.x - this.radius < 0
        )
            this.dx = -this.dx;
        if (
            this.y + this.radius > window.innerHeight ||
            this.y - this.radius < 0
        )
            this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x != undefined && mouse.y != undefined) {
            if (
                mouse.x - this.x < 50 &&
                mouse.x - this.x > -50 &&
                mouse.y - this.y < 50 &&
                mouse.y - this.y > -50
            ) {
                if (this.radius < this.maxRadius) {
                    this.radius += 1;
                }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            }
        }

        this.draw();
    };
}

let circleArray = [];

function init() {
    circleArray = [];
    for (let i = 0; i < 800; i++) {
        let r = Math.random() * 4 + 1;
        let x = Math.random() * (window.innerWidth - r * 2);
        let y = Math.random() * (window.innerHeight - r * 2);
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;
        circleArray.push(new Circle(x, y, dx, dy, r));
    }
}

init();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();
