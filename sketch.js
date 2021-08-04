var trex, trex_running, edges;
var groundImage;
var ground
var invisibleground
var cloud,cloudimg
var obstacle,obstacleimg1,obstacleimg2,obstacleimg3,obstacleimg4,obstacleimg5,obstacleimg6
var trexgameOver,trexrestart,trexcollide
var score
var catusgroup,cloudgroup
var gameover,restart
var gamestate="play"
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudimg=loadImage("cloud.png")
  obstacleimg1=loadImage("obstacle1.png")
  obstacleimg2=loadImage("obstacle2.png")
  obstacleimg3=loadImage("obstacle3.png")
  obstacleimg4=loadImage("obstacle4.png")
  obstacleimg5=loadImage("obstacle5.png")
  obstacleimg6=loadImage("obstacle6.png")
  trexgameOver=loadImage("gameOver.png")
  trexrestart=loadImage("restart.png")
  trexcollide=loadAnimation("trex_collided.png")

}

function setup(){
  createCanvas(600,200);
  console.log(Math.round(random(5,10)))
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trexcollide)
  trex.debug=false
  trex.setCollider("circle",0,0,40)
  edges = createEdgeSprites();
    //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50

  ground=createSprite(300,180,600,20)
  ground.addImage(groundImage)
  ground.velocityX=-2
  
  invisibleground=createSprite(300,190,600,10)
  invisibleground.visible=false
  catusgroup=new Group()
  cloudgroup=new Group()

 gameover=createSprite(300,80,10,10)
 gameover.addImage(trexgameOver)
 gameover.scale=0.5
 gameover.visible=false
 restart=createSprite(300,120,10,10)
 restart.addImage(trexrestart)
 restart.scale=0.5
 restart.visible=false
}


function draw(){
  //set background color 
  background("white");
  
  text("Score:"+score,500,20)
  if(gamestate=="play"){
    ground.velocityX=-4
    if(ground.x<0){
      ground.x=ground.width/2
    }
    if(keyDown("space")&& trex.y>160){
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.5;
    score=Math.round(frameCount/60)
    cloudsdisplay()
  obstacledisplay()
    if(catusgroup.isTouching(trex)){
      gamestate="end"
    }
  }
  else if(gamestate=="end"){
    ground.velocityX=0
    restart.visible=true
    gameover.visible=true
    catusgroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
    catusgroup.setLifetimeEach(-1)
    cloudgroup.setLifetimeEach(-1)
    trex.changeAnimation("collided",trexcollide)

  }
 
  
 
  //jump when space key is pressed
 
  
 
  
  //stop trex from falling down
  trex.collide(invisibleground)
  
  drawSprites();
}
function cloudsdisplay(){
  if(frameCount%60==0){
  cloud=createSprite(600,100,40,10)
  cloud.y=Math.round(random(10,100))
  cloud.addImage(cloudimg)
  cloud.scale=0.5
  cloud.velocityX=-3
  cloud.depth=trex.depth
  trex.depth+=1
  cloud.lifetime=200
  cloudgroup.add(cloud)
    }
}
function obstacledisplay(){
  if(frameCount%80==0){
  obstacle=createSprite(600,165,10,40)
  
  var randomnumber=Math.round(random(1,6))
  switch(randomnumber){
    case 1:obstacle.addImage(obstacleimg1)
          break;
    case 2:obstacle.addImage(obstacleimg2)
          break;
    case 3:obstacle.addImage(obstacleimg3)
          break;
    case 4:obstacle.addImage(obstacleimg4)
          break;
    case 5:obstacle.addImage(obstacleimg5)
          break;
    case 6:obstacle.addImage(obstacleimg6)
          break;
    default:break
  }
  obstacle.scale=0.5
obstacle.velocityX=-3
obstacle.lifetime=200
catusgroup.add(obstacle)
  }
}
