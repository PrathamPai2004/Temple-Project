import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';

import {registerModel,Room,sevaModel} from './models/registerModel.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'

// const User =
const PORT = 3001;

const BASE_URL = `http://localhost:${PORT}`
const app = express()
app.use(express.json())
app.use(cors({
	origin : ["http://localhost:5173"],
	methods :["GET","POST"],
	
}))


app.use(cookieParser())

const MONGO_URI = "mongodb+srv://prathampai:pratham@cluster0.u9nnxcp.mongodb.net/database_users"


mongoose.connect(MONGO_URI).then(()=>{
	console.log('Connected to the database successfully')
}).catch((e)=>{
	console.log(`Error for the database -> `+e.message)
});

const seedRooms = async () => {
	
	console.log('🧹 Clearing existing rooms...');
  await Room.deleteMany({});
	const count = await Room.countDocuments();
	if (count === 0) {
	  console.log('🌱 Seeding rooms...');
	  const dorms = ['Simhapurush', 'Graampurush', 'Mhaalpurush'];
	  for (const dorm of dorms) {
		for (let i = 1; i <= 50; i++) {
		  await Room.create({
			dormitory: dorm,
			roomNumber: i,
			isBooked: false
		  });
		}
	  }
	  console.log('✅ Seeding complete.');
	}
  };
 
app.post('/forgot-password',(req,res)=>{
	const {email} = req.body;
	registerModel.findOne({email}).then(user=>{
		if(!user){
			return res.send({Status : "User not existed"})
		}
		const token = jwt.sign({id:user.__id},"jwt_secret_key",{expiresIn : '1d'})
	})
	
})


app.post('/update',(req,res)=>{
	const data ={
		name : req.body.name,
		email : req.body.name,
		password : req.body.name
	}

	registerModel.findOne({email:data.email}).then(user=>{

	})
})

app.post('/login',(req,res)=>{
	const data= {
		email : req.body.email,
		password:req.body.password
	}

	registerModel.findOne({email:data.email}).then(user=>{
		console.log(user)
		if(user){
			
			console.log(user.password)
			
			
			console.log(`Found the user with valid email ${data.email}`)
			if(user.password===data.password){
				console.log('User name logging in '+user.name)
				console.log('password matched')
				res.json({
					"status" : "success",
					"username" : user.name
				})
			}
			else{
				console.log('Wrong password for email'+data.email)
				res.json("WRONG_PASSWORD")
			}
		}
		else{
			console.log('Record not found for email '+data.email)
			res.json("USER_NOT_EXISTS")
		}
	})
})

app.get("/confirm-seva",async(req,res)=>{
	res.send("This is confirm seva")
})

app.post('/confirm-seva',async (req,res)=>{
	
	const data = {
		seva_name : req.body.seva_name,
		seva_amount : req.body.totalAmount,
		date_booked : Date.now()
	}
	
	console.log('In the server method...confirm-seva')
	console.log(data)

	sevaModel.insertMany(data).then(()=>{
		console.log('Seva booked successfully  in the server.js and sending success to client')
		res.json({
			status:"success"
		})
	}).catch((e)=>{
		console.log('Unsuccessful '+e.message)
	})

	
})


//Dormitory bookings

app.get('/rooms/:dormName',async (req,res)=>{
	try{
		console.log('Getting room information from dorm : '+req.params.dormName)
		const rooms = await Room.find({dormitory : req.params.dormName});
		if(!rooms){
			console.log("Didnt find the room for "+req.params.dormName)
		}
		console.log('Successfully got the get request of booking..')
		// console.log(first)
		return res.json(rooms);

	}
	catch(err){
		res.status(500).json({error:err.message})
	}
})


app.post('/rooms/books',async(req,res)=>{
	const {dormitory,roomNumber,holderName,Date,phoneNumber} = req.body;
	console.log('Booking room '+roomNumber)

	try{
		const room = await Room.findOneAndUpdate(
			{dormitory,roomNumber},
		    {
				$set:{
					isBooked: true,
					holderName,
					phoneNumber,
					Date,
				}
			},
			
			{new:true}

		)
		if(!room){
			return res.status(404).json({
				error: `Room ${room.roomNumber} not found`,
			})
		}
		else{
			console.log(`Room ${roomNumber} booked at ${dormitory}`)
			return res.json(room)
		}
	}
	catch(err){
		res.status(500).json({error:err.message})
	}
})


// router.post()
app.post('/register',async (req,res)=>{
	const data ={
		name : req.body.name,
		password:req.body.password,
		email:req.body.email
	}
		console.log('In the register begin')
		// console.log(registerModel.create(req.body))
		
		registerModel.insertMany(data).then(()=>{
			console.log('Registered successfully')
			res.json({
				"status" : "success",
				"username" : data.name
			})
		}).catch((e)=>{
			console.log('Unsucccessful registration : '+e.message)
		})
		

		//  registerModel.create(req.body).then(register=>console.log(register)).catch(e=>res.json(e));

		
	    

		// const newUser = new registerModel({name,email,password})
		// await newUser.save()
		// return res.status(201).json({ message: "User registered successfully" });
		
	
	// catch(error){
	// 	console.log(`Couldnt get the req.body+ ${error.message}`)
	// 	return res.status(500).json({ message: "Error saving user to database", error: error.message });
	// }

	
	// console.log('in the registerModel.js')
	
	// console.log(name,email,password)
	// registerModel.create(req.body).then(register=>{
	// 	res.json(register);
	// }).catch(err=>res.json(err));

	// await seedRooms();
})

app.listen(PORT,async (req,res)=>{
	console.log(`Server running on http://localhost:${PORT}`)

	
	// console.log(Room.countDocuments())s
	// await Room.deleteMany({})	
	// seedRooms()

})