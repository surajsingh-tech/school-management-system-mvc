let adminHomePage=(req,res)=>{
  res.render('admin/home',{
    title:'Admin Home Page',
    page:'Admin '
  })
}


module.exports={
  adminHomePage  
} 

