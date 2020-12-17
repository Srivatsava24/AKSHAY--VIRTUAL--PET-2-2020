class Food {
    constructor(){

        this.foodStock = 20;
        this.feedtime = 0;
        this.image = loadImage("images/milk.png");
    }

    //updating value of food in database and foodstock with food parameter
    updateFoodStock(food){
        this.foodStock = food;
        database.ref("/").update({Food: food});
    }

    display(){

     var x = 50, y = 200;
     imageMode(CENTER);
     if(this.foodStock != 0){
         for(var i = 0; i < this.foodStock; i++){
             if(i % 10 === 0){
                x = 40;
                y += 60;
             }
             image(this.image, x, y, 50, 50);
             x += 40;
         }
     }
    }
}