require('dotenv').config();const express=require('express');const mongoose=require('mongoose');const cors=require('cors');const morgan=require('morgan');
const app=express();app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173'}));app.use(express.json());app.use(morgan('dev'));
app.get('/api/health',(req,res)=>res.json({ok:true}));app.use('/api/auth',require('./routes/auth'));app.use('/api/attendance',require('./routes/attendance'));app.use('/api/dashboard',require('./routes/dashboard'));
const port=process.env.PORT||5000;mongoose.connect(process.env.MONGO_URI).then(()=>app.listen(port,()=>console.log(`API running on http://localhost:${port}`))).catch(e=>{console.error('MongoDB connection failed:',e.message);process.exit(1)});
