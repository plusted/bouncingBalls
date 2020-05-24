/**get a reference to the canvas element 
 * then call the getcontext()method to give us the 
 * context on which the drawing will be done.
 */

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/** set constants width and height represented by canvas.width
 * and canvas.height equal to width and height of 
 * the browser viewport, gotten from window.innerWidth
 * and window.innerHeight
 */

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

 //fn that takes two numbers as arguements and returns
 // a number in the range of the two

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) +min;
    return num;
 }
 /**
  * x and y are coordinates (horizontal and vertical)
  * velX and velY are horzontal and vertical velocities
  * color is the color each ball gets
  * size (radius in px)
  */
function ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}
/**
 * drawing the ball, add the .draw() method to the ball() prototype
 * beginpath() indicates we want to draw the shape on paper
 * fillstyle fill the ball with color
 * the arc() method traces an arc taking parameters x and y the size of
 * the radius the property of the ball
 * fill method finishes drawing the ball.
 */

ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

let testball = new ball(50, 100, 4, 4, 'blue', 10);

/**
 * to move the ball we add an update method to the ball() prototype
 * the function checks whether the ball has reached the edge of the canvas
 * if it has the polarity of the relevant velocity is changed to ensure the ball 
 * travels to the opposite side.
 * 
 */
ball.prototype.update = function() {
   //x coordinate > the width of the canvas, ball is going right
    if((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }
//x coordinate < width of canvas, ball is going to the left
    if((this.x + this.size) <= 0) {
        this.velX = -(this.velX);
    }
    if((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    if((this.y + this.size) <= 0) {
        this.velY = -(this.velY);
    }
//x +=y equals x = x+y
    this.x += this.velX;
    this.y += this.velY;
}
//storing our balls
let balls = [];

//while loop, creates a new instance of ball() using random()
//it 'pushes', a new ball as long as there are <25 using the push() 

while(balls.length < 10) {
    let size = random(10, 20);
    let Ball = new ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        'rgb(' + random(0, 255) + ', ' + random(0, 255) + ', ' + random(0, 255) + ')', size
    );
    balls.push(Ball);

}
//animation loop is a function that updates information of the program
function loop() {
    //fillStyle fills the color to semi-transparent black
    ctx.fillStyle = 'rgb(0, 0, 0, 0.25)';
   //fillRect takes 4 parameters, start, width & height
    ctx.fillRect(0, 0, width, height);
//loops throught the balls array
    for(let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
    }
    //runs the function a set number of times ensuring that the animation is smooth

    requestAnimationFrame(loop);

}
loop()
