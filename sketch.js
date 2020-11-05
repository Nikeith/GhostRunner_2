var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  
  if (frameCount>60) {
    
  if (gameState === "play") {
    spawnDoor();
    
    
    if (tower.y > 400) {
      tower.y = 300;
    }
    
    if (keyDown("LEFT")) {
      ghost.x = ghost.x-5;
    }
    
    if (keyDown("RIGHT")) {
      ghost.x = ghost.x+5;
    }
    
    if (keyDown("UP")) {
      ghost.velocityY = -5;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8;
    
    if (climbersGroup.isTouching (ghost)) {
      ghost.velocityY = 0;
    }
    
    if (invisibleBlockGroup.isTouching (ghost) || ghost.y > 600) {
      gameState = "end";
      ghost.destroy();
    }
    drawSprites();
  }
  
  if (gameState === "end"){
    fill ("red");
    textSize(30);
    text("GAMEOVER", 230, 250);
  }
  }
}

function spawnDoor() {
  if (frameCount%240 === 0) {
  
  var door = createSprite(200,-50);
  door.addImage(doorImg);
  var climber = createSprite(200,10);
  climber.addImage(climberImg);
  var invisibleBlock = createSprite(200,15,climber.width,2);
  
  door.x = Math.round(random(120,400));
  
  door.velocityY = 1;
  climber.velocityY = 1;
  invisibleBlock.velocityY = 1;
  
  climber.x = door.x;
  invisibleBlock.x = climber.x;
  
  door.lifetime = 800;
  invisibleBlock.lifetime = 800;
  climber.lifetime = 800;
  
  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
  }
}


