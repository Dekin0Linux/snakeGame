let boxSize = 25
let rows = 20
let cols = 20
let board ;
let context ;

//Showing scores varibale
let score = document.getElementById('score');
let count = 0;

let gameOver = false

//Snake Head
let snakeHeadX = boxSize *10; //X coordinate of head
let snakeHeadY = boxSize * 10; //Y coordinate of head

//Food variable initnatized
let foodX ;   
let foodY ; 

//SnakeBody
let snakeBody = []

//MovingPositons
let moveX = 0;
let moveY= 0

//FUnction when screen loads
window.onload = function(){
    //Creating box size
    board = document.getElementById('board')
    board.height = rows*boxSize
    board.width = cols*boxSize
    //used to draw boxes on board
    context = board.getContext('2d')  

    //postion of food on board
    placeFood()
    //To move snake around with keys 
    document.addEventListener('keyup',moveSnake)
    //move to new position every 0.2seconds
    setInterval(update,1000/5) 
}

//Function updating game
function update(){
    //stop game if user lose
    if(gameOver){
        return;
    }

    //fill board color
    context.fillStyle = 'black'
    //coordinate X and Y + width and height to fill
    context.fillRect(0,0,board.width,board.height)

    //Each boxSize fill on board(foodFill)
    context.fillStyle = 'orange' //color of food box
    context.fillRect(foodX,foodY,boxSize,boxSize ) //fill one position

    //Snake eating food when X and Y coordinate meets
    if(snakeHeadX == foodX && snakeHeadY == foodY){
        //Move the food to a random coordinate
        placeFood()
        //push array of foodX and Y cordinates
        snakeBody.push([foodX,foodY])
        //setting score
        count = count + 1
        score.textContent = 'You Score is ' +count
    }

    //postion body according to snake length
    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1]
    }

    //Positon head of snake before the body
    if(snakeBody.length){
        snakeBody[0] = [snakeHeadX,snakeHeadY]
        
    }

    //boxSize fill on board(sneakHeadFill)
    context.fillStyle = 'lime'
    //Fill Snake Movement per boxSize
    snakeHeadX += moveX * boxSize
    snakeHeadY += moveY * boxSize
    context.fillRect(snakeHeadX,snakeHeadY,boxSize,boxSize )

    //Filling snake body with food
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],boxSize,boxSize)
    }

    //Game over functionlities when snake goes overboard 
    if(snakeHeadX < 0 || snakeHeadX >= cols * boxSize || snakeHeadY < 0 || snakeHeadY >= rows * boxSize){
        gameOver = true
        alert('Game over')
        location.reload()
    }

    //Game over condition if snake bites itself
    for (let i = 0 ; i < snakeBody.length ; i++){
        if(snakeHeadX == snakeBody[i][0] && snakeHeadY == snakeBody[i][1]){
            gameOver = true
            alert("Game over")
            location.reload()
        }
    }
}

//Placing food on random cordinates
function placeFood(){
    foodX = Math.floor(Math.random() * cols) * boxSize  //random X coordinate of food
    foodY = Math.floor(Math.random() * rows) * boxSize //random Y coordinate of food
}


//Moving Snake around with arrows
function moveSnake(e){
    if(e.code == 'ArrowUp' && moveY != 1){
        //arow up key, moves item to Y direction(Top) only
        moveX = 0;
        moveY = -1

    }else if(e.code == 'ArrowDown' && moveY != -1){
        //arow down key moves item to Y direction(down) only
        moveX = 0;
        moveY = 1
    }else if(e.code == 'ArrowRight' && moveX != -1){
        //arow down key moves item to Y direction(down) only
        moveX = 1;
        moveY = 0
    }else if(e.code == 'ArrowLeft' && moveX != 1){
        //arow down key moves item to Y direction(down) only
        moveX = -1;
        moveY = 0
    }
}

