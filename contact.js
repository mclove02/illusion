console.log("loaded");

var img;
var birds = [];
var birdNumber = 40;

function setup() {
    var myCanvas = createCanvas(window.innerWidth,window.innerHeight);
    myCanvas.parent("contact-animation");
    
    img = loadImage("dot_circle.png");
//    img = loadImage("giphy.gif");
   
    for(var i=0; i< birdNumber; i++) {
        birds.push(new Bird(random(0, window.innerWidth), random(0,window.innerHeight)));
         background(0, 0, 0);
    }
}

function draw() {
    fill(255, 255, 255, 5);
    rect(0, 0, window.innerWidth, window.innerHeight);
    
    var mousePos = createVector(mouseX, mouseY);
    
    for(var i=0 ; i < birdNumber ; i++){
    birds[i].seek(mousePos);
    birds[i].update();
    birds[i].display();
    };    
}

function Bird(x,y) {
    this.location = createVector(x,y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
//    this.r = 0.0001;
    this.maxforce = random(0.1, 0.1);
    this.maxspeed = random(1.5, 1.5);
    
    this.update = function() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspped);
        this.location.add(this.velocity);
    };
    
    this.seek = function(target) {
        //define the general direction towards which the bird should be flying
        var desired = p5.Vector.sub(target, this.location);
        //reduce the length of the direction to 1, regardless of how far the target is
        desired.normalize();
        desired.mult(this.maxspeed);
        
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce); this.acceleration.add(steer);
    };
    
    this.display = function() {
        image(img, this.location.x, this.location.y);
    };
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

