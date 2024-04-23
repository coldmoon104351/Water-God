let customCursor; // 声明一个变量来存储自定义鼠标指针图像

function preload() {
  // 预加载图像
  customCursor = loadImage('custom_cursor.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 隐藏浏览器默认的鼠标指针
  noCursor();
}

function draw() {
  background(255);
  // 计算自定义鼠标指针的缩放比例
  let scaleFactor = min(150 / customCursor.width, 150 / customCursor.height); // 30 是指定的最大宽度或高度
  // 缩放并在鼠标位置绘制自定义鼠标指针
  image(customCursor, mouseX, mouseY, customCursor.width * scaleFactor, customCursor.height * scaleFactor);
}
