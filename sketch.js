var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload(){
sadDog=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);

 foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,300,150,150);
  dog.addImage(sadDog);
  dog.scale=0.5;

 foodStock = database.ref('food');
  foodStock.on('value',readStock);
  
  

 //feed=createButton("Feed the dog");
  //feed.position(700,95);
  //feed.mousePressed(feedDog);

  //addFood=createButton("Add Food");
  //addFood.position(800,95);
  //addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  //foodObj.display();

  //fedTime=database.ref('FeedTime');
  //fedTime.on("value",function(data){
  //  lastFed=data.val();
  //});

  if(keyWentDown(UP_ARROW)){
    writeStocks(foodS);
    dog.addImage(happyDog);
  }
  

  fill(255,255,254);

  text('PRESS UP ARROW KEY TO FEED THE DOG', 150, 10);
  textSize(15);

  if(lastFed>=12){
    //text("Last Feed : "+ lastFed%12 + " PM", 350,30);
  }
  else if(lastFed==0){
     //text("Last Feed : 12 AM",350,30);
  }
  else{
    // text("Last Feed : "+ lastFed + " AM", 350,30);
  }

  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStocks(x){
  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({food: x});
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<= 0){
   foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }

  database.ref('/').update({
  Food:foodObj.getFoodStock(),
   FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
 })
} 