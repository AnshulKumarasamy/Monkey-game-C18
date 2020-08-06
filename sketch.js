var PLAY = 1;
var END = 0;
var gameState = PLAY; 

var canvas;
var monkey, monkeyIMG, monkeyStop;
var obstacles, obstacleIMG;
var banana, bananaIMG;
var ground, groundIMG;
var scene, sceneIMG;
var gameOver, gameOverIMG;
var restart, restartIMG;
var score = 0;

 function preload(){
  monkeyIMG=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png", "Monkey_05.png","Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
   monkeyStop= loadAnimation("Monkey_05.png");
   obstaclesIMG = loadImage ("stone.png"); 
   bananaIMG = loadImage ("banana.png");
   sceneIMG = loadImage ("jungle.jpg");
   gameOverIMG= loadImage ("gameOver.png");
   restartIMG = loadImage ("restart.png");
  
 }


function setup() {
  canvas = createCanvas(1200,800);
  
   ground= createSprite(600,400,1200,10);
   ground.addImage(groundIMG);
   ground.velocityX=-6; 
   ground.x=ground.width/2;
   ground.visible=false;
  
   scene= createSprite(600,400,1200,800);
   scene.addImage(sceneIMG);
   scene.velocityX=-6; 
   scene.x=scene.width/2;
  
   monkey = createSprite(200,600,100,75);
   monkey.addAnimation(monkeyIMG);
    
   gameOver= createSprite(200,200,10,10);
   gameOver.addImage(gameOverIMG);
  
   restart= createSprite(200,340,10,10);
   restart.addImage(restartIMG);
  
  BananaGroup = new Group ();
  ObstacleGroup = new Group();
}


function draw(){
 background(255);
 scene.velocityX=-6; 
 scene.x=scene.width/2;

   if ( gameState === PLAY){
    
    if (keyDown("space")){
    monkey.velocityY = -15 ;
    }
    
    if (ground.x < 150){
    ground.x = ground.width/2;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if (BananaGroup.isTouching(monkey)) {
      BananaGroup.setLifetimeEach(0); 
    }
     
    stroke("white");
    textSize(20);
    fill("white");
    text("score: "+ score,500,50); 
    
    if (ObstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
    
    Banana();
    Obstacles(); 
  
  } else if(gameState === END){
    
    ObstacleGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    
    ground.velocityX=0;
    
    ObstacleGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    monkey.velocityX(0);
    monkey.velocityY(0);   
    
    monkey.changeAnimation(monkeyStop);
    
    stroke("black");
    textSize(20); 
    fill("black");
    text("score: "+0,100,50); 
  }  
  drawSprites();
}

function Banana(){
  if(frameCount%80 === 0){
    var banana = createSprite (600, random (200,250),100,75);
    banana.addImage(bananaIMG);
    banana.scale=0.05;
    banana.velocityX=-4;
    banana.lifetime=110;
    BananaGroup.add(banana); 
  } 
}

function Obstacles (){
  if (frameCount%200 === 0) {
    var obstacles = createSprite (600,250,100,75);
    obstacles.addImage(obstaclesIMG);
    obstacles.scale=0.15;
    obstacles.velocityX=-4;
    obstacles.lifetime=110;
    ObstacleGroup.add(obstacles); 
  }
}
