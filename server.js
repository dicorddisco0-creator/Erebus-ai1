const express=require('express');
const {GoogleGenerativeAI}=require('@google/generative-ai');
require('dotenv').config();
const app=express();
app.use(express.json());
app.use(express.static('public'));
const ai=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
app.post('/chat',async(req,res)=>{
 try{
 const model=ai.getGenerativeModel({model:'gemini-2.5-flash'});
 const r=await model.generateContent(req.body.message);
 res.json({reply:r.response.text()});
 }catch(e){res.json({reply:'Connection error'});}
});
app.listen(3000);
