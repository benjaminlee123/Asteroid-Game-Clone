class BulletSystem {

    constructor(){
      this.bullets = [];
      this.velocity = new createVector(0, -5);
      this.diam = 10;
    }
  
    run(){
        this.move();
        this.draw();
        this.edges();
    }
  
    fire(x, y){
      this.bullets.push(createVector(x,y));
    }
  
    //draws all bullets
    draw(){
      fill(255);
      for (var i=0; i<this.bullets.length; i++){
        ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
      }
    }
  
    //updates the location of all bullets
    move(){
      for (var i=0; i<this.bullets.length; i++){
        this.bullets[i].y += this.velocity.y;
      }
//    move(){
//        for (var i=0; i<this.bullets.length; i++){
//            if(this.bullets[i].direction == "w"){
//                this.bullets[i].vector.y += this.leftUpVelocity.y;
//            }
//            if(this.bullets[i].direction == "s"){
//                this.bullets[i].vector.y += this.rightDownVelocity.y;
//            }
//            if(this.bullets[i].direction == "a"){
//                this.bullets[i].vector.x += this.leftUpVelocity.x;
//            }
//            if(this.bullets[i].direction == "d"){
//                this.bullets[i].vector.x += this.rightDownVelocity.x;
//            }
//        }
//    }
    }
    
  
    //check if bullets leave the screen and remove them from the array
    edges(){
        // YOUR CODE HERE (3 lines approx)
        for(var i=0; i<this.bullets.length; i++){
          if(this.bullets[i].y > 800){
            this.bullets[i].splice(i, 1)
          }
        }
    }
  }
  
