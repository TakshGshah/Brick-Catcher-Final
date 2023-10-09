var PLAY = 1;
var END = 0;
var gameState = PLAY;
var player, playerImg;
var redImg, greenImg, yellowImg;
var bricks, brick;
var score = 0
var congrat;
var life=3;
var blast;
var blast2, blast1

function preload(){
bgImg=loadImage("assets/bg.jpg")
playerImg=loadImage("assets/boy.png");
greenImg=loadImage("assets/blueB.png")
redImg=loadImage("assets/redB.png")
yellowImg=loadImage("assets/yellowB.png")
cImg= loadAnimation("assets/Congrats.gif")
bBoom = loadImage("assets/blueBoom.png")
yBoom = loadImage("assets/yellowBoom.png")
rBoom = loadImage("assets/redBoom.png")
blastSound = loadSound("assets/Blast.mp3")
goodSound = loadSound("assets/daDing.mp3")
gOver = loadImage("assets/gameOver.webp")
}

function setup(){
createCanvas(1150,600)

player=createSprite(570,450,20,20);
player.addImage(playerImg)
player.scale=0.3;

ground=createSprite(600,590,1200,20)
ground.shapeColor="blue"

congrat=createSprite(600, 300, 20, 20)
congrat.addAnimation("c1", cImg)
congrat.scale=0.5
congrat.visible=false
redGroup=new Group()
yellowGroup = new Group()
greenGroup = new Group()
player.setCollider("rectangle", 0, 0, 200, 380)
player.debug= false

g1=createSprite(550,280,20,20)
g1.addImage(gOver)
g1.scale=0.3
g1.visible=false
}

function draw(){
background(bgImg);
textSize(30)
fill("white")
text("Score: "+ score,970, 50)

textSize(30)
fill("white")
text("Life: "+ life,870, 50)

    if (keyDown(UP_ARROW) && player.y>=480) {
      player.velocityY-=5
    }

    if (keyDown(DOWN_ARROW)) {
        player.y += 2.5;
    }

    if (keyDown(LEFT_ARROW)) {
        player.x -= 5;
      }
  
      if (keyDown(RIGHT_ARROW)) {
        player.x += 5;
      }
      
      player.velocityY=player.velocityY+0.5

      // newly added condition

      if(redGroup.collide(player)){
        blastSound.play()
        handleBlast1(redBricks)
      }
      if(yellowGroup.collide(player)){
        goodSound.play()
        score=score+5
        handleBlast2(yellowBricks)
      }

      if(greenGroup.collide(player)){
        goodSound.play()
        score=score+2
        handleBlast3(greenBricks)
      }


      if(score >=200){
        congrat.visible=true
        player.destroy()
      }
      if(life===0){
        g1.visible=true
        player.destroy()
      }
      player.collide(ground)

      redBricks()
      yellowBricks()
      greenBricks()
drawSprites();
}

function redBricks(){
  if(frameCount % 140 === 0){
    brick=createSprite(random(0,1000),50,20,20)
   // brick.addImage("red",rBoom)
    brick.velocityY+=3+score/5
    brick.addImage(redImg)
    brick.scale=0.1
    redGroup.add(brick)
  }
}

function yellowBricks(){
  if(frameCount % 150 === 0){
    brick1=createSprite(random(300,600),50,20,20)
    brick1.velocityY+=3
    brick1.addImage(yellowImg)
    brick1.scale=0.1
    yellowGroup.add(brick1)
  }
}

function greenBricks(){
  if(frameCount % 200 === 0){
    brick2=createSprite(random(600,1000),50,20,20)
    brick2.velocityY+=3
    brick2.addImage(greenImg)
    brick2.scale=0.1
    greenGroup.add(brick2)
  }
}

function handleBlast1(brickGroup){
  if(life>0){
   life=life-1;
  }
  blast=createSprite(brick.x,brick.y,20,20)
  blast.addImage(rBoom)
  blast.scale=0.1;
  blast.lifetime=10;
  redGroup.destroyEach();
}

function handleBlast2(brick1Group){
  blast1=createSprite(brick1.x,brick1.y,20,20)
  blast1.addImage(yBoom)
  blast1.scale=0.1;
  blast1.lifetime=10;
  yellowGroup.destroyEach();
}

function handleBlast3(brick2Group){
  blast2=createSprite(brick2.x,brick2.y,20,20)
  blast2.addImage(bBoom)
  blast2.scale=0.1;
  blast2.lifetime=10;
  greenGroup.destroyEach();
}