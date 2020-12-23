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
  createCanvas(1350,630);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  var greeting = createElement('h3');
  var greeting1 = createElement('h3');

  //To wriite name of the dog
  input = createInput ("Enter your Dog's Name"); 
  input.position (1025, 295); 

  var name = input.value();

  input1 = createInput ("Fill opinion about your dog"); 
  input1.position (1000, 470);
  var opinion = input1.value();

  var button = createButton("submit");
  button.position(1170, 470);

  var button1 = createButton("submit");
  button1.position(1195, 295);

  dog=createSprite(670,350,10,60);
  dog.addImage(sadDog);
  dog.scale=0.5;

  feed=createButton("Feed your Dog");
  feed.position(1200,385);
  feed.mousePressed(feedDog);

  addFood=createButton("Buy Milk Bottles");
  addFood.position(920,385);
  addFood.mousePressed(addFoods);

  button1.mousePressed(function(){


    greeting.html("Master I am Hungry");
    greeting.position(800, 150);
    greeting1.html("Please feed me");
    greeting1.position(805, 195);
 })

  button.mousePressed(function(){
    input.hide();
    addFood.hide();
    feed.hide();
    button1.hide();
    button.hide();
    input1.hide();


    greeting.html("Thank you Master😀😄 ");
    greeting.position(800, 150);
    greeting1.html("Meet you soon");
    greeting1.position(805, 195);
 })
}

function draw() {
  background("blue");
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed (approx timing) : "+ lastFed%12 + " PM", 50,200);
   }else if(lastFed==0){
     text("Last Fed (approx timing) : 12 AM",50,200);
   }else{
     text("Last Fed (approx timing) : "+ lastFed + " AM", 50,200);
   }

  drawSprites();

  //display food stock
  strokeWeight(3);
  stroke("blue")
  fill("white");
  textSize(30);
  text("Milk bottles left in stock : " + foodS, 30, 605);


  fill("white");
  textSize(18);
  text("NOTE: To be filled only after feeding your dog. ", 950, 610);


  fill("WHITE");
  textSize(50);
  textStyle(BOLD);
  textFont("segoe script");
  text("AKSHAY'S VIRTUAL PET - 2 2020",200,80);
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
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