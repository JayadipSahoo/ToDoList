//jshint esversion:6

const express= require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");



const app= express();


app.set('view engine','ejs');//to connect ejs
app.use(bodyParser.urlencoded({extended: true}));//to pass the data from Data base to App.js
app.use(express.static("public"));

//to connect to database
mongoose.connect("mongodb+srv://admin:user_1234@cluster0.b8aiwjl.mongodb.net/todolistDB");
const itemSchema=new mongoose.Schema({
    name:String
 });
 //Capitalise const 
const Item=mongoose.model("Item", itemSchema);//create mongoose model to create new model (use single forms)


//to insert the item in data base
/*Item.insertMany(item1,function(err){
    if(err){
        console.log(err);
    }
    else
        console.log("ADDED SUCCESSFULLY");
})*/

app.get("/", function(req, res) {

    var today = new Date();
    
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"

    };

    var day=today.toLocaleDateString("en-US",options);
    Item.find({}, function(err, foundItems)
    {
        //pass the values to ejs (front end) as kindOfDay and newItems
        res.render("list", {kindOfDay: day, newItems: foundItems});
    });
    

});
app.post("/",function(req,res){
    //to add new item
    const itemName=req.body.newItem;
    /*if (req.body.newItem==="clear"){
        var dbo = todolistDB.db("todolistDB");

        dbo.dropCollection("Items",function(err, result){
        console.log("Error : "+err);
        if (err) throw err;
        console.log("Operation Success ? "+result);
        // after all the operations with db, close it.
        db.close();
    })
}else{*/
         //declare the new item and get the value from ejs
    const item=new Item({
        name:itemName
        });
        //save the item
        item.save();
        //redirect to home page to see the newly added document
        res.redirect("/");
   // }


});
//delete the checked
/*
app.post("/delete",function(req,res){
    const checked=req.body.checkbox;
    Item.findByIdAndRemove(checked,function(err){
        if( ! err){
            console.log("deleted");
        }
    });

})
*/
app.listen(process.env.PORT||3001,function(){
    console.log("server Working")
 }); 
module.exports=app;//for vercel to turn express into a serverless funtion 
