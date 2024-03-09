const express = require('express');
const cors=require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('./models/User.js')
const Place=require('./models/Place.js');
const cookieParser=require('cookie-parser');
require('dotenv').config()
const app=express();
const multer=require('multer');
const fs=require('fs');
const Booking=require('./models/Booking.js');

const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecret='ghfrsetyoigdgvjhjjftd';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));

app.use(cors({
   credentials:true,
   origin:'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.get('/test', (req,res) =>{
    res.json('test ok');
});

app.post('/register',async (req,res) => {
    const{name,email,password}=req.body;
    try {
        const userDoc=await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
    
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
    

    
});

app.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    const userDoc=await User.findOne({email});
    if(userDoc){
        const passOk=bcrypt.compareSync(password,userDoc.password)
        if(passOk){
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id
            },jwtSecret,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(userDoc);
            });
            
        }
        else{
            res.status(422).json('pass not ok');
        }
    } 
    else{
        res.status(404).json("not found");
    }
});



app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err) throw err;
            const {name,email,_id}=await User.findById(userData.id);
            res.json({name,email,_id});
        });
    }
    else{
        res.json(null);
    }
    
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
});


const photosMiddleware=multer({dest:'uploads/'});

app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles=[];
    for(let i=0;i<req.files.length;i++){
        const {path,originalname}=req.files[i];
        const parts=originalname.split('.');
        const ext=parts[parts.length-1];
        const newPath=path + '.' + ext;
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath.replace('uploads\\',''));
    }
    res.json(uploadedFiles);
});

app.post('/places',(req,res)=>{
    const{title,address,city,addedPhotos,description,checkIn,checkOut,maxGuests,price}=req.body;
    const placeDoc=Place.create({
        title,address,city,photos:addedPhotos,description,checkIn,checkOut,maxGuests,price,
    })
    res.json(placeDoc);
});

app.get('/places', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



  app.get('/places/:id',async (req,res)=>{
    const {id}=req.params;
    res.json(await Place.findById(id));
  });

  app.post('/bookings',async(req,res)=> {
    const userData=await getUserDataFromReq(req);
    const {place,checkIn,checkOut,numberOfGuests,name,phone,rooms,price}=req.body;
    Booking.create({
        place,checkIn,checkOut,numberOfGuests,name,phone,rooms,price,
        user:userData.id,
    }).then((doc)=>{
        res.json(doc);
    }).catch((err)=>{
        throw err;
    });
  });

  function getUserDataFromReq(req){
    return new Promise((resolve,reject)=>{
        jwt.verify(req.cookies.token,jwtSecret,{},async (err,userData)=>{
            if(err) throw err;
            resolve(userData);
        });
    });
   
  }

  app.get('/bookings',async(req,res)=>{
    const userData=await getUserDataFromReq(req);
    res.json(await Booking.find({user:userData.id}).populate('place'))
  });

  app.get('/details', async (req, res) => {
    try {
      const details = await Booking.find().populate('place');
      res.json(details);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/saved', async (req, res) => {
    try {
      const saved = await Place.find();
      res.json(saved);
    } catch (error) {
      console.error('Error fetching:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  // app.delete('/deleteHotel/:hotelId', async (req, res) => {
  //   const hotelId = req.params.hotelId;
  
  //   try {
  //     await Place.findByIdAndDelete(hotelId);
  //     res.status(200).json({ success: true });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ success: false, error: 'Server error' });
  //   }
  // });

  app.delete('/deleteHotel/:hotelId', async (req, res) => {
    const hotelId = req.params.hotelId;
  
    try {
      // Find the hotel to get the list of photos
      const hotel = await Place.findById(hotelId);
  
      // Delete each photo from the 'uploads' folder
      for (const photo of hotel.photos) {
        const photoPath = __dirname + '/uploads/' + photo;
        fs.unlinkSync(photoPath);
      }
  
      // Delete the hotel from the database
      await Place.findByIdAndDelete(hotelId);
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  });
  
  
  
  app.post('/bookings/:bookingId/cancel', async (req, res) => {
  const { bookingId } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ success: true, message: 'Booking canceled successfully' });
  } catch (error) {
    console.error('Error canceling booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(4000);
