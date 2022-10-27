var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var circle = function (x, y, radius, fillCircle) {
 ctx.beginPath();
 ctx.arc(x, y, radius, 0, Math.PI * 2, false);
 if (fillCircle) {
 ctx.fill();
 } else {
 ctx.stroke();
 }
};


var Ball = function () {
    this.x = width / 2;
    this.y = height / 2;
    this.speed = 5;
    this.size = 10;
    this.xSpeed = 1;
    this.ySpeed = 0;
};

Ball.prototype.move = function () {
 this.x += this.xSpeed * this.speed;
 this.y += this.ySpeed * this.speed;

 if (this.x < 0 || this.x > width) {            // Первое задание //
    this.xSpeed = -this.xSpeed;
  } else if (this.y < 0 || this.y > height) {
    this.ySpeed = -this.ySpeed;
  }
};


Ball.prototype.draw = function () {
 circle(this.x, this.y,this.size,true);
};

Ball.prototype.setDirection = function (direction) {
 if (direction === "up") {
 this.xSpeed = 0;
 this.ySpeed = -5;
 } else if (direction === "down") {
 this.xSpeed = 0;
 this.ySpeed = 5;
 } else if (direction === "left") {
 this.xSpeed = -5;
 this.ySpeed = 0;
 } else if (direction === "right") {
 this.xSpeed = 5;
 this.ySpeed = 0;
 } else if (direction === "stop") {
 this.xSpeed = 0;
 this.ySpeed = 0;
 }
};
Ball.prototype.doAction = function (action) {
  if (action === "вверх") {
    this.xSpeed = 0;
    this.ySpeed = -1;
  } else if (action === "вниз") {
    this.xSpeed = 0;
    this.ySpeed = 1;
  } else if (action === "влево") {
    this.xSpeed = -1;
    this.ySpeed = 0;
  } else if (action === "вправо") {
    this.xSpeed = 1;
    this.ySpeed = 0;
  } else if (action === "стоп") {
    this.xSpeed = 0;
    this.ySpeed = 0;
  } else if (action === "быстрее") {
    this.speed++;
  } else if (action === "медленнее") {
    if (this.speed > 0) {
      this.speed--;
    }
  } else if (action === "меньше") {
    if (this.size > 0) {
      this.size--;
    }
  } else if (action === "больше") { // третье задание //
    this.size++; 
  }
};
Ball.prototype.setSpeed = function (newSpeed) {
    if (newSpeed !== undefined) {
      this.speed = newSpeed;
    }
};
var ball = new Ball();

var keyActions = {
 32: "стоп", // остановка
 37: "влево", // влево
 38: "вверх", // вверх
 39: "вправо",// вправо
 40: "вниз", // вниз
 88: "быстрее",
 90: "медленнее",
 67: "меньше",
 86: "больше"
};
var speeds = {            // второе задание скорость на клавиши 
      49: 1,
      50: 2,
      51: 3,
      52: 4,
      53: 5,
      54: 6,
      55: 7,
      56: 8,
      57: 9
};  
$("body").keydown(function (event) {
  var action = keyActions[event.keyCode];
  ball.doAction(action);
 var direction = keyActions[event.keyCode];
 var speed = speeds[event.keyCode];
      ball.setDirection(direction);
      ball.setSpeed(speed);
});

setInterval(function () {
 ctx.clearRect(0, 0, width, height);
 ball.draw();
 ball.move();
 ctx.strokeRect(0, 0, width, height);
}, 30);