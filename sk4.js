let particles = [];
let particleImage;
let particleSize = 100;
let maxParticles = 100;
let customCursor;
let clickCount = 0; // 用來跟踪點擊次數的變數
let startTime; // 計時器開始時間
let elapsedTime = 0; // 已過時間
let restartButton;

function preload() {
  particleImage = loadImage('particle.png'); // 替換成你自己的粒子圖像路徑
  customCursor = loadImage('123.png'); // 替換成你自己的鼠標圖像路徑
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  startTime = millis(); // 設置計時器開始時間
  restartButton = createButton('RESTART'); // 創建"RESTART"按鈕
  restartButton.position(width / 2 - 50, height / 4); // 設置按鈕位置在中間上方
  restartButton.hide(); // 隱藏按鈕
  restartButton.mousePressed(restartGame); // 綁定按鈕點擊事件
  restartButton.style('background-color', 'white'); // 按鈕背景色為白色
  restartButton.style('color', 'black'); // 文字顏色為黑色
  restartButton.style('border', '2px solid black'); // 黑色邊框
  restartButton.style('font-weight', 'bold'); // 文字加粗
  restartButton.style('border-radius', '10px'); // 圓角設計
  restartButton.style('font-size', '24px'); // 字體放大1倍
}

function draw() {
  background(255);
  
  // 計算經過的時間
  elapsedTime = millis() - startTime;
  
  // 如果時間已達10秒，停止計算點擊次數，顯示RESTART按鈕
  if (elapsedTime >= 10000) {
    noLoop(); // 停止 draw() 函數的執行
    restartButton.show(); // 顯示按鈕
    particles = []; // 清除粒子陣列
  }
  
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
  
  // 計算自訂滑鼠圖像的寬高比
  let aspectRatio = customCursor.width / customCursor.height;
  // 根據比例縮放圖像
  let cursorWidth = 50;
  let cursorHeight = cursorWidth / aspectRatio;
  // 繪製自訂滑鼠圖像
  image(customCursor, mouseX - cursorWidth / 2, mouseY - cursorHeight / 2, cursorWidth, cursorHeight);
  
  // 在畫面中顯示點擊次數和計時器
  fill(0); // 將文字顏色設置為黑色
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Count: " + clickCount, width / 2, height / 10); // 文本顯示在中間上方
  let remainingTime = max(0, 10 - int(elapsedTime / 1000)); // 剩餘時間（秒）
  text("Time: " + remainingTime, width / 2, height / 7 + 40); // 文本顯示在中間上方，增加一個字體高度的間距
}

function restartGame() {
  clickCount = 0; // 重置點擊次數
  startTime = millis(); // 重置計時器開始時間
  loop(); // 重新啟動 draw() 函數的執行
  restartButton.hide(); // 隱藏按鈕
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
        clickCount++; // 當點擊滑鼠時增加點擊次數
        return true;
      }
    }
    return false;
  }
}
