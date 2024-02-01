var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var score;
var button;
var vector;
var c1, c2; 



//////////////////////////////////////////////////
function setup()

{
    score =0;
    createCanvas(1200,800);
    spaceship = new Spaceship();
    asteroids = new AsteroidSystem();

    //location and size of earth and its atmosphere
    atmosphereLoc = new createVector(width/2, height*2.9);
    atmosphereSize = new createVector(width*3, width*3);
    earthLoc = new createVector(width/2, height*3.1);
    earthSize = new createVector(width*3, width*3);
    angleMode(DEGREES);
    createRestartButton();
}

//////////////////////////////////////////////////
function createRestartButton(){
    button = createButton('Click me to try again!');
    button.position(550, 500);
    button.size(100,50);
    button.mousePressed(restartGame);
    button.hide();
}
//////////////////////////////////////////////////
function restartGame(){
    button.hide();
    setup();
    draw();
    loop();
}
function showScore(){
    textSize(32);
    fill(255);
   // text('Hit Score: ' + score, 825, 750); 
}
function draw() {
    push();
    c1 = color(25,0,51);
    c2 = color(102,0,51);
    setGradient(0, 0, width, height, c1, c2);
    pop();
    sky();
    fill(255);
    textSize(32);
    text("Score: " + score, 1000, 30);

    spaceship.run();
    asteroids.run();

    drawEarth();

    checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
    noStroke();
    //draw atmosphere
    fill(102,178,255, 90);//Aesthetic Modification
    ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
    //draw earth
    fill(0,41,82);//Aesthetic Modification
    ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i=0; i<asteroids.locations.length; i++){
        if(isInside(spaceship.location, spaceship.size, asteroids.locations[i], asteroids.diams[i])){
            gameOver()
        }
    }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i=0; i<asteroids.locations.length; i++){
        if(isInside(earthLoc, earthSize.x, asteroids.locations[i], asteroids.diams[i])){
            gameOver()
        }
    }

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(earthLoc, earthSize.x, spaceship.location, spaceship.size)){
        gameOver()
    }

    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(atmosphereLoc, atmosphereSize.x, spaceship.location, spaceship.size)){
        spaceship.setNearEarth()
    }

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    for(var i=0; i<asteroids.locations.length; i++){
        for(var j=0; j<spaceship.bulletSys.bullets.length; j++){
            if(isInside(spaceship.bulletSys.bullets[j], spaceship.bulletSys.diam, asteroids.locations[i], asteroids.diams[i])){
                asteroids.destroy(i)
                spaceship.bulletSys.bullets.splice(j, 1)
                score += 1;
                console.log('x');
                break;
            }
        }
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
// YOUR CODE HERE (3-5 lines approx)

function isInside(locA, diamA, locB, diamB){

    if(dist(locA.x, locA.y, locB.x, locB.y) < (diamA/2) + (diamB/2)){
        return true;
    } 
    return false;
} 

//////////////////////////////////////////////////
function keyPressed(){
    if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
        spaceship.fire();
    }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
    button.show();
    //game over and display total score
    push();
    fill(255);
    textSize(80);
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);
    textSize(42);
    translate(0, 50);
    text("Total Score: " + (score), width/2, height/2);
    pop();
    noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
    push();
    while (starLocs.length<300){
        starLocs.push(new createVector(random(width), random(height)));
    }
    fill(255);
    for (var i=0; i<starLocs.length; i++){
        rect(starLocs[i].x, starLocs[i].y,2,2);
    }

    if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
    pop();
}
function setGradient(x, y, w, h, c1, c2){
    noFill();
    for (var i = y; i <= y+h; i++) 
    {
        var inter = map(i, y, y+h, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x+w, i);
    }
}