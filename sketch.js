var dog,sadDog,happyDog;
var database, foodObj;
var lastFed , foodS;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  canvas = createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  Name = createInput("Name");
  Name.position(950,350);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
  form = new Form();

}

function draw() {
  background(46,139,87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+lastFed%12 + "PM", 350 , 30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM", 350 , 30);
  }else{
    text("Last Feed :"+lastFed +"AM", 350 , 30);
  }

  foodObj.display();
  drawSprites();
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
