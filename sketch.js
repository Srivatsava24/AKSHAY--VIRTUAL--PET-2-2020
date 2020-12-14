//variables 
var database;
var dog, dogImg, happyDog;
var foodS = 20;
var FeedTime = 0;
var foodObj = null;
var feedButton, addButton;

//load images
function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}


function setup() {

  //canvas
  createCanvas(1350, 630);

   var greeting = createElement('h3');
   var greeting1 = createElement('h3');

  //button to feed the dog
  feedButton = createButton("Feed your dog");
  feedButton.position(1200, 385);
  feedButton.mousePressed(feedDog);

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

  //button to add food for the dog
  addButton = createButton("Buy Milk Bottles");
  addButton.position(920, 385);
  addButton.mousePressed(addFood);


  button1.mousePressed(function(){


    greeting.html("Master I am Hungry");
    greeting.position(800, 150);
    greeting1.html("Please feed me");
    greeting1.position(805, 195);
 })

  button.mousePressed(function(){
    input.hide();
    addButton.hide();
    feedButton.hide();
    button1.hide();
    button.hide();
    input1.hide();


    greeting.html("Thank you Master😀😄 ");
    greeting.position(800, 150);
    greeting1.html("Meet you soon");
    greeting1.position(805, 195);
 })




  //create foodObj
  foodObj = new Food();

  //create dog
  dog = createSprite(670, 350, 10, 60);
  dog.scale = 0.5;
  dog.addImage("dog1", dogImg);
  dog.addImage("dog2", happyDog);


}


function draw() {  

  //background
  background("blue");

   //display last fed
   fill("white");
   textSize(15);

   //FeedTime = database.ref('FeedTime');
   //FeedTime.on("value", function(data){
    // FeedTime = data.val()
  // })

   if(FeedTime>=12){
     text("Last Fed (approx timing) : "+ FeedTime%12 + " PM", 50,200);
    }else if(FeedTime==0){
      text("Last Fed (approx timing) : 12 AM",50,200);
    }else{
      text("Last Fed (approx timing) : "+ FeedTime + " AM", 50,200);
    }

   //draw all sprites
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
  //display foodObj
  foodObj.display();

}


//increment foodS, updateFoodStock using foodS
function addFood(){
  foodS++;
  foodObj.updateFoodStock(foodS);
}


//change dog image, deduct foodS, updateFoodStock using foodS, set lastFed
function feedDog(){
  if(foodS > 0){
    dog.changeAnimation("dog2", happyDog);
    foodS--;
    foodObj.updateFoodStock(foodS);
    FeedTime = hour();
    foodObj.updateLastFed(FeedTime);
  }
}