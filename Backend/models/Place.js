const mongoose=require('mongoose');

const placeSchema=new mongoose.Schema({
    title:String,
    address:String,
    city:String,
    photos:[String],
    description:String,
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number,
    price:Number,
});

const PlaceModel=mongoose.model('Place',placeSchema);
module.exports=PlaceModel;
