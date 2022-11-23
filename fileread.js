var fs = require('fs'); 
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');  
// var MongoClient = require('mongodb').MongoClient;
var bodyParser = require("body-parser");
var app = express();
 

app.use(express.static(path.join(__dirname)))
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');


mongoose.connect("mongodb://127.0.0.1:27017/TripManagement", async function(err,res){
    if(err) throw err;
    else{
        console.log("Database Connected Successfully");
    }
  });

app.get('/', function (req, res) {  
  res.sendFile(__dirname+'/'+'index.html');  
});



app.get('/booking.html',async function(req,res){
    res.sendFile(__dirname+'/'+"angular_booking.html" );
})

app.post('/book.html',async function(req,res){


  const bookingschema = {
    BookingId:{type:Number},
    HotelName:{type:String},
    FullName:{type:String},
    Place:{type:String},
    Checkin:{type:String},
    Checkout:{type:String},
    Rooms:{type:Number},
    Adults:{type:Number},
    Children:{type:Number},
    Email:{type:String},
    Phone:{type:Number}

  };
  var bookingdetails;
  if (mongoose.models.booking) {
    bookingdetails = mongoose.model('booking');
  } else {
    bookingdetails = mongoose.model('booking', bookingschema);
  }
  


  var bookingids = await bookingdetails.find({});
  
  if(bookingids[bookingids.length-1] == undefined){
    var bookingid = 1;
  }
  else{
    var bookingid = bookingids[bookingids.length-1].BookingId;
    bookingid = bookingid+1;
  }
  
  bookingdata = new bookingdetails(
    {
      BookingId:bookingid,
      HotelName: req.body.hotelname,
      FullName: req.body.fullname,
      Place: req.body.address,
      Checkin: req.body.checkin,
      Checkout: req.body.checkout,
      Rooms: req.body.rooms,
      Adults: req.body.adults,
      Children: req.body.children,
      Email: req.body.email,
      Phone: req.body.phoneno
  }
    );
  // console.log("Hotelname",req.body.hotelname)

  bookingdata.save(async function(err,res){
      if(err){
        console.log(err);
      }
      else{
          console.log("Document Related to Booking Inserted Successfully");
      }
  });

  res.redirect('/');




//   obj={
//     Fullname : req.body.fullname,
//     Place : req.body.address,
//     CheckIn : req.body.checkin,
//     CheckOut : req.body.checkout,
//     NoofRooms : req.body.rooms,
//     NoofAdults : req.body.adults,
//     NoofChildren : req.body.children,
//     Email : req.body.email,
//     Phoneno: req.body.phoneno,
//     radiobtn:req.body.favlang
//   };

//   // createdb("TripManagement");
//   // createcollection("TripManagement","Booking");
  

//   function insertelement(dbname,cname,obj){
//     var url = "mongodb://127.0.0.1:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db(dbname);
  
//   dbo.collection(cname).insertOne(obj, function(err, res) {
//     if (err) throw err;
//     console.log('1 Document Inserted Successfully');
//     db.close();
//   });
 


// });
// return 1;
//   }

  // var x = insertelement("TripManagement","Booking",obj);
  // if (x == 1){
  //   res.write("<html><body><h1 style='color:green'>Document Inserted Successfully!</h1></body></html>");
  // }
  // else{
  //   res.write("<html><body><h1 style='color:red'>Error in  Document insertion</h1></body></html>");
  // }

  



  

});


// function createdb(name){
//   var url = "mongodb://127.0.0.1:27017/"+name;

//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
//   });
// }


// function createcollection(dbname,cname){

//   var url = "mongodb://127.0.0.1:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("dbname");
//   dbo.createCollection(cname, function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });


// }


app.get('/booking_admin.html',async function(req,res){



  const bookingschema = {
    BookingId:{type:Number},
    HotelName:{type:String},
    FullName:{type:String},
    Place:{type:String},
    Checkin:{type:String},
    Checkout:{type:String},
    Rooms:{type:Number},
    Adults:{type:Number},
    Children:{type:Number},
    Email:{type:String},
    Phone:{type:Number}

  };
  var bookingdetails;
  if (mongoose.models.booking) {
    bookingdetails = mongoose.model('booking');
  } else {
    bookingdetails = mongoose.model('booking', bookingschema);
  }
 

  await bookingdetails.find({},async function(err,data){
    if(err){
      console.log(err);
    }
    else{
      res.render('booking_admin',{data});
    }

  }).clone().catch(function(err){ console.log(err)});



});


app.post('/deletebooking',async function(req,res){

  const bookingschema = {
    BookingId:{type:Number},
    HotelName:{type:String},
    FullName:{type:String},
    Place:{type:String},
    Checkin:{type:String},
    Checkout:{type:String},
    Rooms:{type:Number},
    Adults:{type:Number},
    Children:{type:Number},
    Email:{type:String},
    Phone:{type:Number},
   

  };
  var bookingdetails;
  if (mongoose.models.booking) {
    bookingdetails = mongoose.model('booking');
  } else {
    bookingdetails = mongoose.model('booking', bookingschema);
  }

  await bookingdetails.deleteOne({ BookingId: req.body.bid},async function(err,data){
    if(err){
      console.log(err);
    }
    else{
      console.log("Document Related to booking Deleted Successfully");
     
      
    }

  }).clone().catch(function(err){ console.log(err)});;

  res.redirect('/booking_admin.html');

});



app.post('/modifybooking',async function(req,res){

  var data={
    BookingId:req.body.bid,
    HotelName: req.body.hotelname,
    FullName: req.body.fullname,
    Place: req.body.address,
    Checkin: req.body.checkin,
    Checkout: req.body.checkout,
    Rooms: req.body.rooms,
    Adults: req.body.adults,
    Children: req.body.children,
    Email: req.body.email,
    Phone: req.body.phoneno

  };


  res.render('modify_booking',{data});

});

app.post('/updatebooking',async function(req,res){

  const bookingschema = {
    BookingId:{type:Number},
    HotelName:{type:String},
    FullName:{type:String},
    Place:{type:String},
    Checkin:{type:String},
    Checkout:{type:String},
    Rooms:{type:Number},
    Adults:{type:Number},
    Children:{type:Number},
    Email:{type:String},
    Phone:{type:Number},
   

  };
  var bookingdetails;
  if (mongoose.models.booking) {
    bookingdetails = mongoose.model('booking');
  } else {
    bookingdetails = mongoose.model('booking', bookingschema);
  }

  var query = {'BookingId':req.body.bid};

  var booking_updated = 
    {
      BookingId:req.body.bid,
      HotelName:req.body.hotelname,
      FullName:req.body.fullname,
      Place:req.body.address,
      Checkin:req.body.checkin,
      Checkout:req.body.checkout,
      Rooms:req.body.rooms,
      Adults:req.body.adults,
      Children:req.body.children,
      Email:req.body.email,
      Phone:req.body.phoneno,

    };
  

  bookingdetails.findOneAndUpdate(query,booking_updated, {upsert: true}, async function(err, doc) {
    if (err) return res.send(500, {error: err});
    else{
      console.log('Document Updated Successfully');
    }
});

res.redirect('/booking_admin.html');



});

app.post('/searchbooking',async function(req,res){
  var query={BookingId:req.body.bid};
  const bookingschema = {
    BookingId:{type:Number},
    HotelName:{type:String},
    FullName:{type:String},
    Place:{type:String},
    Checkin:{type:String},
    Checkout:{type:String},
    Rooms:{type:Number},
    Adults:{type:Number},
    Children:{type:Number},
    Email:{type:String},
    Phone:{type:Number}

  };
  var bookingdetails;
  if (mongoose.models.booking) {
    bookingdetails = mongoose.model('booking');
  } else {
    bookingdetails = mongoose.model('booking', bookingschema);
  }
 

  await bookingdetails.find(query,async function(err,data){
    if(err){
      console.log(err);
    }
    else{
      res.render('booking_admin',{data});
    }

  }).clone().catch(function(err){ console.log(err)});


  

});




app.post('/addhotel',async function(req,res){

  const hotelschema = {
    HotelId:{type:Number},
    Hotelname:{type:String},
    City:{type:String},
    Country:{type:String},
    StrtAddr:{type:String},
    Zipcode:{type:Number},
    Latitude:{type:Number},
    Longitude:{type:Number},
    Telephone:{type:Number},
    Email:{type:String},
    URL:{type:String},
    Accomodation:{type:String},
    Frontdesk:{type:String},
    feehskpng:{type:String},
    Hskpng:{type:String},
    Restrictions:{type:String},
    Seasonals:{type:String},
    OnsiteStaff:{type:String},
    Amneties:{type:Array}
  };

  var hoteldetails;
  if (mongoose.models.hotel) {
   hoteldetails = mongoose.model('hotel');
  } else {
    hoteldetails= mongoose.model('hotel', hotelschema);
  }

  var hotelids = await hoteldetails.find({});
  
  if(hotelids[hotelids.length-1] == undefined){
    var hotelid = 1;
  }
  else{
    var hotelid = hotelids[hotelids.length-1].HotelId;
    hotelid = hotelid+1;
  }

  var hotelname = req.body.placename;
  var city = req.body.address;
  var Country=null;
  try{Country = req.body.country;}
  catch{}
  var strtaddr = req.body.strtaddr;
  var zip = req.body.zip;
  var lat=  null;
  try{lat = req.body.lat;}
  catch{}
  var long= null;
  try{long = req.body.long;}
  catch{}
  var tel = req.body.tel;
  var email = req.body.email;
  var url=null;
  try{url = req.body.urlweb;}
  catch{}
  var acc = req.body.acc;
  var frontdesk = req.body.cin;
  var feehskpng = req.body.adf;
  var hskpng = req.body.hpp;
  var restrictions = req.body.rsp;
  var seasonals = req.body.psc;
  var oss = req.body.oss;

  var amneties = amnties();
  async function amnties(){
    var arr = new Array();
    for(i=0;i<27;i++){
      arr[i] = "NULL";
    }
      

    if(req.body.x1 != undefined ){arr[0] = req.body.x1;}
    if(req.body.x2 != undefined ){arr[1] = req.body.x2;}
    if(req.body.x3 != undefined ){arr[2] = req.body.x3;}
    if(req.body.x4 != undefined ){arr[3] = req.body.x4;}
    if(req.body.x5 != undefined ){arr[4] = req.body.x5;}
    if(req.body.x6 != undefined ){arr[5] = req.body.x6;}
    if(req.body.x7 != undefined ){arr[6] = req.body.x7;}
    if(req.body.x8 != undefined ){arr[7] = req.body.x8;}       
    if(req.body.x9 != undefined ){arr[8] = req.body.x9;}
    if(req.body.x10 != undefined ){arr[9] = req.body.x10;}
    if(req.body.x11 != undefined ){arr[10] = req.body.x11;}
    if(req.body.x12 != undefined ){arr[11] = req.body.x12;}
    if(req.body.x13 != undefined ){arr[12] = req.body.x13;}
    if(req.body.x14 != undefined ){arr[13] = req.body.x14;}
    if(req.body.x15 != undefined ){arr[14] = req.body.x15;}
    if(req.body.x16 != undefined ){arr[15] = req.body.x16;}
    if(req.body.x17 != undefined ){arr[3] = req.body.x17;}
    if(req.body.x18 != undefined ){arr[4] = req.body.x18;}
    if(req.body.x19 != undefined ){arr[5] = req.body.x19;}
    if(req.body.x20 != undefined ){arr[6] = req.body.x20;}
    if(req.body.x21 != undefined ){arr[7] = req.body.x21;}       
    if(req.body.x22 != undefined ){arr[8] = req.body.x22;}
    if(req.body.x23 != undefined ){arr[9] = req.body.x23;}
    if(req.body.x24 != undefined ){arr[10] = req.body.x24;}
    if(req.body.x25 != undefined ){arr[11] = req.body.x25;}
    if(req.body.x26 != undefined ){arr[12] = req.body.x26;}
    if(req.body.x27 != undefined ){arr[13] = req.body.x27;}
   
 
    return arr;
  };


  hoteldata = new hoteldetails(
    {
      HotelId:hotelid,
      Hotelname:hotelname,
      City:city,
      Country:Country,
      StrtAddr:strtaddr,
      Zipcode:zip,
      Latitude:lat,
      Longitude:long,
      Telephone:tel,
      Email:email,
      URL:url,
      Accomodation:acc,
      Frontdesk:frontdesk,
      feehskpng:feehskpng,
      Hskpng:hskpng,
      Restrictions:restrictions,
      Seasonals:seasonals,
      OnsiteStaff:oss,
      Amneties:amneties
  }
    );

    hoteldata.save(async function(err,res){
      if(err){
        console.log(err);
      }
      else{
          console.log("Document Related to Hotels Inserted Successfully");
      }
  });

  res.redirect('/');

  
});
 
app.get('/hotel_admin.html',async function(req,res){

  const hotelschema = {
    HotelId:{type:String},
    Hotelname:{type:String},
    City:{type:String},
    Country:{type:String},
    StrtAddr:{type:String},
    Zipcode:{type:Number},
    Latitude:{type:Number},
    Longitude:{type:Number},
    Telephone:{type:Number},
    Email:{type:String},
    URL:{type:String},
    Accomodation:{type:String},
    Frontdesk:{type:String},
    feehskpng:{type:String},
    Hskpng:{type:String},
    Restrictions:{type:String},
    Seasonals:{type:String},
    OnsiteStaff:{type:String},
    Amneties:{type:Array}
  };

  var hoteldetails;
  if (mongoose.models.hotel) {
   hoteldetails = mongoose.model('hotel');
  } else {
    hoteldetails= mongoose.model('hotel', hotelschema);
  }

  await hoteldetails.find({},async function(err,data){
    if(err){
      console.log(err);
    }
    else{
      console.log(data);
      res.render('hotels_admin',{data});
    }

  }).clone().catch(function(err){ console.log(err)});

    
});





var server = app.listen(8000, function () {  
  var host = server.address().address;  
  var port = server.address().port;  
  console.log('Example app listening at http://localhost:%s', port);  
});  