// const frontRouter=require('express').Router() 
// or
let express=require('express');
let frontRouter=express.Router()

const {homePage,aboutPage}=require('../halpers/front')     

frontRouter.get('/',homePage)
frontRouter.get('/aboutPage',aboutPage)
module.exports={
  frontRouter:frontRouter,
  aboutPage:aboutPage,
}