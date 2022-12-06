var bgImg,basketImg,appleImg,bananaImg,melonImg,pineappleImg,orangeImg;
var bg,fruitsGroup,basket,invisibleSprite,restart;
var score=10;
var gameState=0;
function preload(){
  bgImg=loadImage("images/bg.jpg");
  basketImg=loadImage("images/basket.png");
  appleImg=loadImage("images/apple2.png");
  bananaImg=loadImage("images/banana2.png");
  melonImg=loadImage("images/melon2.png");
  orangeImg=loadImage("images/orange2.png");
  pineappleImg=loadImage("images/pineapple2.png");
  collectedSound=loadSound("sounds_success.mp3");
  monster1Img=loadImage("images/monster1.png");
  monster2Img=loadImage("images/monster2.png");
  monster3Img=loadImage("images/monster3.png");
  mistakeSound=loadSound("sounds_negative.mp3");
}





function setup() {
  createCanvas(1000,900);
  bg=createSprite(400, 200, 1000, 400);
 // bg.addImage(bgImg);
  bg.scale=1.3;
  basket=createSprite(100,350,100,100);
  basket.addImage(basketImg);
  basket.scale=0.3;

  fruitsGroup=new Group();
  invisibleSprite=createSprite(500,460,1000,10);
  monsterGroup=new Group();
  restart=cretaeSprite(400,300);
}



function draw() {
  background(255,255,255); 
  bg.addImage(bgImg);
  if (gameState===0){

  
  if(keyDown("RIGHT_ARROW")){
  basket.x=basket.x+5;
  }
  if(keyDown("LEFT_ARROW")){
    basket.x=basket.x-5;
  }
  spawnFruits();
  basket.overlap(fruitsGroup,function(collector,collected){
    collected.remove();
    score=score+20;
    collectedSound.play();
  })
  invisibleSprite.overlap(fruitsGroup,function(collector,collected){
  collected.remove();
  })
  spawnMonsters();
  invisibleSprite.overlap(monsterGroup,function(collector,collected){
    collected.remove();
  }
  )
  basket.overlap(monsterGroup,function(collector,collected){
    collected.remove();
    score=score-50
    mistakeSound.play();
  }
  )
  

  drawSprites();
  textSize(20);
  fill ("white");
  text("Score:"+score,700,20);
  if (score<=0){
    gameState=1;
  }
}
else if (gameState===1){
 image(bgImg,0,0,800,400)
  fill("red");
 textSize(50)
 strokeWeight(5)
 stroke('black');
  text("Game Over !!",250,200);
  fill("red")
  textSize(40)
  strokeWeight(5)
  text("Better Luck Next Time :))",200,250)
  

}
}
function spawnFruits(){
  if (frameCount%60===0){
    x=random(10,750);
    fruit=createSprite(x,-10,20,20);
    fruit.velocityY=10;
  var rand=Math.round(random(1,5));
  if(rand===1){
    fruit.addImage(appleImg);
  }
  else if(rand===2){
    fruit.addImage(bananaImg);
  }
  else if(rand===3){
    fruit.addImage(melonImg);
  }
  else if(rand===4){
    fruit.addImage(orangeImg);
  }
  else {
    fruit.addImage(pineappleImg);
  }
  fruitsGroup.add(fruit);
  if (fruit.y>300){
    fruitsGroup.destroyEach();
  }
  
    
  
  }
  
  }
  function spawnMonsters(){
    if (frameCount%120===0){
      x=random(10,750);
      monster=createSprite(x,-10,20,20);
      monster.velocityY=10;
      var rand=Math.round(random(1,3));
      if (rand===1){
        monster.addImage(monster1Img);
        monster.scale=0.3;
      }
      else if(rand===2){
        monster.addImage(monster2Img);
        monster.scale=0.3;
      }
      else {
        monster.addImage(monster3Img);
        monster.scale=0.3;
      }
      monsterGroup.add(monster);

}
    }
  
