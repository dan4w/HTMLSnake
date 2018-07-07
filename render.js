/**
 * Visuals for the HTML5 game
 * Render can access snake.js but snake.js can't access render.js
 *
 * @Author: Daniel Forwood
 * @Date:   2018-06-29T19:13:13-07:00
 * @Last modified by:   Daniel Forwood
 * @Last modified time: 2018-09-24T22:04:43-07:00
 * @Version: 1.0.1
 */



// Getting tag from HTML. Puts display in here.
var canvas = document.getElementById('canvas');

var W = 600, H = 600; // Size of canvas
var BOX_W = W/COLS; // Pixels per box width
var BOX_H = H/ROWS; // Pixels per box height
var ctx = canvas.getContext('2d');
var fruit_image = new Image(BOX_W,BOX_H); //Creates an Image variable of size Box_W & Box_H
fruit_image.src = 'Icons/apple.png'; //Picture for the fruit


//Transforms from COLS to x axis pixel
function transformX(x){
  return W * x / COLS;
}

//Transforms from ROW to y axis pixel
function transformY(y){
  return H * (1-(y+1) / ROWS);
}

//Renders the snake on the canvas
function renderSnake(){

  var snakeHeadx = snake[0].x; // Column that snake head is in
  var snakeHeady = snake[0].y; // Row that snake head is in

  var xx2 = transformX(snakeHeadx),
      yy2 = transformY(snakeHeady);




  ctx.fillStyle = "#FFA500"; //Set head to orange
  ctx.fillRect(xx2,yy2,BOX_W,BOX_H); // Draw head
  ctx.strokeStyle = 'black'; //Set border to black
  ctx.strokeRect(xx2, yy2, BOX_W, BOX_H); //Draw border


  // Draws the snake
  for(var i = 1; i < snake.length; ++i){  //Every index in snake is part of the snake
    var x = snake[i].x,  // x-value location of snake head & body
        y = snake[i].y; // y-value location of snake head & body

    var xx = transformX(x),
        yy = transformY(y);

    // If still playing, set color of the snake is brown. If game is lost, set color of the snake is red
    if(playing){
      ctx.fillStyle = '#A26A42';
    }
    else{
      ctx.fillStyle = 'red';
    }

    ctx.fillRect(xx, yy, BOX_W, BOX_H); //Draws 1 single box of the snake with setted color
    ctx.strokeStyle = 'black'; //Set border color to black
    ctx.strokeRect(xx, yy, BOX_W, BOX_H); //Draws the border

  }
}


function renderFruit(){
  var xx3 = transformX(fruit.x); //transforms from COLS to x pixel values
  var yy3 = transformY(fruit.y); //transforms from ROWS to y pixel values

  ctx.drawImage(fruit_image,xx3-2,yy3-2,BOX_W+3,BOX_H+3)  //(image, x-pos,y-pos,x-size,y-size) x-pos and y-pos are offset to centre
}


function init(){
  renderSnake();
  renderFruit();
}


function render(){
  if(playing){
    ctx.clearRect(0,0,W,H);   //clears the canvas
    renderSnake();   //draws the snake
    renderFruit(); //draws the fruit

    setTimeout(render, 50); //calls render every 20ms
  }
  renderSnake();
}

  init();
  render();
