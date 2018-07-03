/**
 * Visuals for the HTML5 game
 *
 * @Author: Daniel Forwood
 * @Date:   2018-06-29T19:13:13-07:00
 * @Last modified by:   Daniel Forwood
 * @Last modified time: 2018-07-02T23:31:18-07:00
 * @Version: 1.0
 */



var canvas = document.getElementById('canvas');
var W = 600, H = 600;
var BOX_W = W/COLS;
var BOX_H = H/ROWS;
var ctx = canvas.getContext('2d');
var fruit_image = new Image(BOX_W,BOX_H);



function transformX(x){
  return W * x / COLS;
}

function transformY(y){
  return H * (1-(y+1) / ROWS);
}

function renderSnake(){

  var snakeHeadx = snake[0].x;
  var snakeHeady = snake[0].y;

  var xx2 = transformX(snakeHeadx),
      yy2 = transformY(snakeHeady);

  ctx.fillStyle = "#FFA500";
  ctx.fillRect(xx2,yy2,BOX_W,BOX_H);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(xx2, yy2, BOX_W, BOX_H);


  for(var i = 1; i < snake.length; ++i){
    var x = snake[i].x,
        y = snake[i].y;

    var xx = transformX(x),
        yy = transformY(y);


    if(playing){
      ctx.fillStyle = '#A26A42';
    }
    else{
      ctx.fillStyle = 'red';
    }

    ctx.fillRect(xx, yy, BOX_W, BOX_H);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(xx, yy, BOX_W, BOX_H);
  }


}

function renderFruit(){
  var xx3 = transformX(fruit.x);
  var yy3 = transformY(fruit.y);


  fruit_image.src = 'Icons/apple.png';

  fruit_image.onload = function(){
    ctx.drawImage(fruit_image,xx3,yy3,BOX_W+5,BOX_H+5)
  }
  console.log("HI");
  //console.log(playing);

  //ctx.fillStyle = 'green';
  //ctx.fillRect(xx,yy, BOX_W, BOX_H);
  //ctx.strokeSytyle = 'black';
  //ctx.strokeRect(xx,yy, BOX_W, BOX_H);
}

function init(){
  renderSnake();
  renderFruit();
}


function render(){
  if(playing){
    ctx.clearRect(0,0,W,H);

    renderSnake();

    renderFruit();

    setTimeout(render, 20);
  }
  renderSnake();
}

  init();
  render();
