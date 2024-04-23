let particles = [];
let particleImage;
let particleSize = 100;
let maxParticles = 100;
let customCursor = 100;

function preload() {
  particleImage = loadImage('particle.png'); // 替換成你自己的粒子圖像路徑
  customCursor = loadImage('custom_cursor.png'); // 替換成你自己的鼠標圖像路徑
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  customCursor.resize(width / 10, height / 10);
}

function draw() {
  background(255);
  
  if (particles.length < maxParticles) {
    particles.push(new Particle(width/2, height/2));
  }
  
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isClicked()) {
      particles.splice(i, 1);
    }
  }
  
  // 設置鼠標圖標
  cursor(customCursor);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = p5.Vector.random2D().mult(random(1, 3)); // 隨機方向和速度
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      // 如果粒子超出畫布範圍，移除
      particles.splice(particles.indexOf(this), 1);
    }
  }

  display() {
    image(particleImage, this.x, this.y, particleSize, particleSize);
  }

  isClicked() {
    if (mouseIsPressed) {
      let d = dist(this.x, this.y, mouseX, mouseY);
      if (d < particleSize / 2) {
        return true;
      }
    }
    return false;
  }
}
