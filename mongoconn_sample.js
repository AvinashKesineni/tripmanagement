const mongoose = require('mongoose');
const mongodb = require('mongodb');
const express = require('express');
const fs = require('fs');
const { resourceLimits } = require('worker_threads');

var email = "kesinenivenkataavinash@gmail.com";
var pass = "1234";

Mongoclient = mongodb.MongoClient;
var url = "mongodb://127.0.0.1:27017/";

//For Creating Database

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
//   });



//For Creating Collection

// Mongoclient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     dbo.createCollection("customers", function(err, res) {
//       if (err) throw err;
//       console.log("Collection created!");
//       db.close();
//     });
//   });


//Code to Insert element

// Mongoclient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     var myobj = { name: "Company Inc", address: "Highway 37" };
//     dbo.collection("customers").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });

// For Finding Element

// Mongoclient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.collection("customers").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// });




// var mongoose = require('mongoose');
const contactSchema = {
    email:{type:String, unique:true},
    pass:{type:Number}
  };

  mongoose.connect("mongodb://127.0.0.1:27017/mydb", async function(err,res){
    if(err) throw err;
    else{
        console.log("Database Connected Successfully");
    }
  });
    
const details = mongoose.model("Customers",contactSchema);

//const doc = await details.create({ email: 'bill@microsoft.com',pass:1234 })

// data = new details({email:email,pass:pass});
// data.save(function(err,res){
//     if(err) throw err;
//     else{
//         console.log("Document Inserted Successfully");
//     }
// });


findall()
async function findall(){
    const messages = await details.find({}) 
    console.log(messages);

}

// var x = await details.find({},async function(err,res){
//     if(err) throw err;
//     else{
//         console.log(res);
//     }
// })
// console.log(x)





