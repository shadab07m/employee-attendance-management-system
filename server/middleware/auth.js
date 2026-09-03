const jwt=require('jsonwebtoken');
const User=require('../models/User');
async function auth(req,res,next){try{const h=req.headers.authorization||'';if(!h.startsWith('Bearer '))return res.status(401).json({message:'Authentication required'});const decoded=jwt.verify(h.slice(7),process.env.JWT_SECRET);const user=await User.findById(decoded.id).select('-password');if(!user)return res.status(401).json({message:'User not found'});req.user=user;next();}catch(e){res.status(401).json({message:'Invalid or expired token'});}}
function hrOnly(req,res,next){if(req.user?.role!=='hr')return res.status(403).json({message:'HR access required'});next();}
module.exports={auth,hrOnly};
