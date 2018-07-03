/**
 * Game logic for the HTML5 game.
 *
 * @Author: Daniel Forwood
 * @Date:   2018-06-29T19:13:09-07:00
 * @Last modified by:   Daniel Forwood
 * @Last modified time: 2018-07-03T02:47:39-07:00
 * @Version: 1.0
 */


// Number of "cells" for the game
var ROWS = 30;
var COLS = 30;

var snake = [];
var SNAKE_INITIAL_LENGTH = 5;
var speed = { //initial direction
  x: 1,
  y: 0
};
var GAME_SPEED = 120; // milliseconds before snake moves
var playing = true;
var fruit;
var newSpeed = false; // direction check

function newFruit(){
  do {
    fruit = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random()* ROWS)
    };
  } while (onSnake(fruit));
}


function init(){
  for(var i = 0; i <SNAKE_INITIAL_LENGTH; ++i){
    snake.push({
      x:Math.floor(COLS/2) - i,
      y:Math.floor(ROWS/2)
    });
  }

  newFruit();
}

function lose(){
  playing = false;
}


function inBorder(position){
  return position.x>=0 && position.y >=0 && position.x < COLS && position.y < ROWS;
}

function onSnake(position){
  for (var i = 0; i < snake.length; ++i){
    if (position.x == snake[i].x && position.y == snake[i].y) {
      return true;
    }
  }
  return false;
}

function integrate(){
  var head = snake[0];
  if( newSpeed !== false){
    speed = newSpeed;
    newSpeed = false;
  }

  var dx = speed.x;
  var dy = speed.y;
  var newPosition = {
    x: head.x + dx,
    y: head.y + dy
  };

  if(playing){

    if(!inBorder(newPosition) || onSnake(newPosition)){
      lose();
      return;
    }
    snake.unshift(newPosition);
    if(newPosition.x == fruit.x && newPosition.y == fruit.y){
      newFruit();
    }
    else{
      snake.pop();
    }

  }

  setTimeout(integrate, GAME_SPEED);
}

init();
integrate();
