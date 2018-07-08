/**
 * Game logic for the HTML5 game.
 *
 * @Author: Daniel Forwood
 * @Date:   2018-06-29T19:13:09-07:00
 * @Last modified by:   Daniel Forwood
 * @Last modified time: 2018-09-24T23:09:19-07:00
 * @Version: 1.0.1
 */


// Number of "cells" for the game
var ROWS = 30; //Number of rows in the game
var COLS = 30; //Number of columns in the game

var snake = []; // Variable for snake
var SNAKE_INITIAL_LENGTH = 5;
var speed = { //initial direction  x = 1 means left -1 is right y= 1 is up y= -1 is down
  x: 1,
  y: 0
};
var GAME_SPEED = 120; // milliseconds before snake moves
var playing = true; // Check to see if game is ongoing
var fruit; //Co-ords for fruit
var newSpeed = false; // direction check


// Creates a new fruit
function newFruit(){
  do {
    fruit = { //Fruit is an object with an x and y coordinate
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random()* ROWS)
    };
  } while (onSnake(fruit)); //Repeats if the generated fruit is already on the snake
}

// Add initial snake into snake array
function init(){
  for(var i = 0; i <SNAKE_INITIAL_LENGTH; ++i){
    snake.push({
      x:Math.floor(COLS/2) - i,  // x is the column of the snake which starts at the middle of the canvas
      y:Math.floor(ROWS/2) // y is the row of the snake which starts at the middle (ROW/2)
    });
  }

  newFruit(); //Starts the board with a fruit
}

// Changes playing variable to lose
function lose(){
  playing = false;
}

// Checks if position is inside game board
function inBorder(position){
  return position.x>=0 && position.y >=0 && position.x < COLS && position.y < ROWS;
}

//Checks if a position is on the snake
function onSnake(position){
  for (var i = 0; i < snake.length; ++i){ //Iterates through the snake
    if (position.x == snake[i].x && position.y == snake[i].y) { //if position of x & y is the same as the position of the snake x and y
      return true;
    }
  }
  return false; //Default false
}

//State of game
function integrate(){
  var head = snake[0];

  if( newSpeed !== false){

    speed = newSpeed; // Set the direction of the next tick
    newSpeed = false;
    /* If the queue has more than 1 keypress queued, then remove until 1 key press left in queue
    * this is to go through all the keypresses in case user presses multiple keys with little delay
    */

  }

  var dx = speed.x; //will be 1,0 or -1
  var dy = speed.y; //will be 1,0,or -1

  //Calculating new head for next tick of the game
  var newPosition = {
    x: head.x + dx, //new x position of the head
    y: head.y + dy //new y position of the head
  };

  // If snake not in board, or snake hits itself then call lose() to state that game is lost
  if(playing){
    if(!inBorder(newPosition) || onSnake(newPosition)){
      lose();
      return;
    }

    /* Unshift adds to the beginning of an array
    * Calculated a new head for each tick of the game and adds it to the front of the array
    */
    snake.unshift(newPosition);

    if(newPosition.x == fruit.x && newPosition.y == fruit.y){
      newFruit(); //Creates a new fruit if the snake eats it
    }
    else{
      snake.pop(); //removes the last item of the snake, the array of the snake is constantly changing
    }

  }

  setTimeout(integrate, GAME_SPEED); //repeat every GAME_SPEED ms (1000ms = 1s)
}

init();
integrate();
