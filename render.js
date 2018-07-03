/**
 * Visuals for the HTML5 game
 *
 * @Author: Daniel Forwood
 * @Date:   2018-06-29T19:13:13-07:00
 * @Last modified by:   Daniel Forwood
 * @Last modified time: 2018-07-02T19:36:33-07:00
 * @Version: 1.0
 */



var canvas = document.getElementById('canvas');
var W = 600, H = 600;
var BOX_W = W/COLS;
var BOX_H = H/ROWS;
var ctx = canvas.getContext('2d');


function transformX(x){
  return W * x / COLS;
}

function transformY(y){
  return H * (1-(y+1) / ROWS);
}

function renderSnake(){
  for(var i = 0; i < snake.length; ++i){
    var x = snake[i].x,
        y = snake[i].y;

    var xx = transformX(x),
        yy = transformY(y);


    if(playing){
      ctx.fillStyle = 'blue';
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
  var xx = transformX(fruit.x);
  var yy = transformY(fruit.y);
  ctx.fillStyle = 'green';
  ctx.fillRect(xx,yy, BOX_W, BOX_H);
  ctx.strokeSytyle = 'black';
  ctx.strokeRect(xx,yy, BOX_W, BOX_H);
}

function render(){
  ctx.clearRect(0,0,W,H);

  renderSnake();
  renderFruit();

  setTimeout(render, 17);
}

render();
