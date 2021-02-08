const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var train1 = [];
var train2 = [];
var ghostCount=0
var gameState=0
var power
var powerGroup
function preload() {
  ghost = loadImage("images/ghost3.png");
  pumpkin = loadImage("images/pumpkin.png");
  scoobytrans = loadImage("images/scooby.png");
  vanImage = loadImage("images/van.png");
  bg=loadImage("images/bg.jpg")
  powerImg=loadImage("images/strong.png")
}
function setup() {
  createCanvas(1500, 500);
  engine = Engine.create();
  textSize(40);
  fill("white")
  world = engine.world;
  ground = new Ground(400, 500, 2000, 30);
  scooby = Bodies.circle(200, 390, 80, { isStatic: false, density: 5000 });
  Matter.Body.setDensity(scooby, 5000);
  World.add(world, scooby);
powerGroup=new Group()
  vanSprite = createSprite(1160, 450);
  vanSprite.addImage(vanImage);
  vanSprite.scale = 0.2;
  vanSprite.velocityY = 2;


  scoobySprite=createSprite(200,200)
  scoobySprite.visible=false
  edges = createEdgeSprites();
}

function draw() {
  background(bg);
  console.log(gameState)
  
if(gameState==0){
  textSize(30);
  fill("white")
  text("Reach the home before ghost pushes to win", 100, 50);
  text("If the ghost pushes you to right side, you lose", 100, 80);
  text("Number of Ghoshs beaten "+ghostCount,490,480)
  drawSprites();
  vanSprite.bounceOff(edges);
  //image(vanImage,550,330,180,180)
  Engine.update(engine);

  ground.display();

  //console.log(scooby.position)
  imageMode(CENTER);
  // rect(scooby.position.x, scooby.position.y, 60, 50);
  console.log(scooby.position);
  ellipseMode(RADIUS);

  //circle(scooby.position.x,scooby.position.y,80)
  image(scoobytrans, scooby.position.x, scooby.position.y + 20, 150, 200);
  scoobySprite.x=scooby.position.x
  scoobySprite.y=scooby.position.y
  if(scoobySprite.isTouching(vanSprite)){
    gameState=1;
     }

     if(scoobySprite.x<0){
      gameState=2;
    }
    if (frameCount % 40 == 0) {
      ghostCount+=1
      train1.push(new train(random(300,1300), random(0, 500), 150, 180));
    }
  
    if (frameCount % 55 == 0) {
      ghostCount+=1
      train2.push(new train(random(300,1300), random(0, 500), 150, 180));
    }
   
    
  if(frameCount%200==0){
    power=createSprite(1000,random(0,500),50,50)
    power.velocityX=-3
    power.addImage(powerImg)
  powerGroup.add(power)
 
  power.scale=0.2
  }
  if(powerGroup.isTouching(scoobySprite)){
    console.log("power got")
    Matter.Body.setDensity(scooby,5000)
   Matter.Body.setVelocity(scooby,{x:20,y:0})
  }
    for (var i = 0; i < train1.length; i++) {
      train1[i].display();
      Matter.Body.setVelocity(train1[i].body, { x: -10, y: 0 });
      imageMode(CENTER);
      image(
        ghost,
        train1[i].body.position.x,
        train1[i].body.position.y,
        150,
        180
      );
      //  image()
      // console.log(train1[i])
    }
  
    for (var i = 0; i < train2.length; i++) {
      train2[i].display();
      Matter.Body.setVelocity(train2[i].body, { x: -10, y: 0 });
      imageMode(CENTER);
      image(
        pumpkin,
        train2[i].body.position.x,
        train2[i].body.position.y,
        150,
        180
      );
      //  image()
      // console.log(train1[i])
    }
} else if(gameState==1){
   // textSize(20);
    textFont("Helvetica")
    text("Scooby is saved",500,250)
  }else if(gameState==2) {
    
  //  textSize(20);
    textFont("Helvetica")
    text("Scooby is dead",700,200)
    //gameState=3;
    train2=[];
    train1=[]
  }
 
}

function keyPressed() {
  //  console.log("key");
  //a letter
  if (keyCode === 65 || keyCode === 97) {
    Matter.Body.setVelocity(scooby, { x: -10, y: 0 });
  }

  if (keyCode === 83 || keyCode == 115) {
    Matter.Body.setVelocity(scooby, { x: 0, y: 10 });
  }
  //d letter
  if (keyCode == 68 || keyCode == 100) {
    Matter.Body.setVelocity(scooby, { x: 10, y: 0 });
  }

  if (keyCode == 87 || keyCode == 119) {
    Matter.Body.setVelocity(scooby, { x: 0, y: -10 });
  }
}
function spawnTrains() {}
