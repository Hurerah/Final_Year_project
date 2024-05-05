const express= require('express');
const router= express.Router();
const bcrypt = require('bcrypt');
const user= require('../models/user_schema')

//signup
router.post('/signup',(req,res)=>{

const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const currentDate = new Date();

if (!req.body) {
    return res.status(400).json({ error: 'Request body is missing' });
  }

  // Extract properties from req.body
  const { username, email, password, cnf_password, dateOfBirth } = req.body;

  const parsedDateOfBirth = new Date(dateOfBirth);
  // Check if all required properties exist
  if (!username || !email || !password || !cnf_password || !dateOfBirth) {
    return res.status(400).json({ error: 'Missing required fields in request body' });
  }
  else if(!(nameRegex).test(username))
{
    res.json({
        status:"Failed",
        message:"Invalid Name Feild"
    })
}
else if(!(emailRegex).test(email))
{
    res.json({
        status:"Failed",
        message:"Invalid Email Feild"
    })
}
else if(password.length<6 )
{
    res.json({
        status:"Failed",
        message:"Password should be greater then 6 digits"
    })
}

else if(parsedDateOfBirth>currentDate)
{
    res.json({
        status:"Failed",
        message:"Invalid Date Of Birth"
    })
}
else
{
    user
    .find({email})
    .then(result=>{
        if (result.length)
        {
            res.json({
                status:"Failed",
                message:"Email already exist"
           
            })
        }
        else
        {
            const updated_user = new user({ username, email, password, cnf_password, dateOfBirth});
            updated_user.save()
            .then(result=> {
                res.status(200).json({
                    status: 'SUCCESS',
                    message: 'User registered successfully',
                    data: result
                  });    
            })

            .catch(error=>{
                console.error(error);
                res.status(500).json({
                  status: 'Error',
                  message: 'An error occurred while saving the user'
                });
            })
        }
    })
    .catch(err=>{
        console.log(err)
        res.json({
            status:"Failed",
            message:"Error accured while checking for existing email"
        })
    })
}

})

//signin

router.post('/signin',(req,res)=>{
  
if (!req.body) {
    return res.status(400).json({ error: 'Request body is missing' });
  }

  // Extract properties from req.body
  const { username, email, password, cnf_password, dateOfBirth } = req.body;
  if (!email || !password ) {
    return res.status(400).json({ error: 'Missing required fields in request body' });
  }
  else{
    user.find({email})
    .then((result)=>
    {
        if (result.length)
        {
            const hash_pass=result[0].password;
            bcrypt.compare(password,hash_pass)
            .then(result1=>{
            if (result1)  
            {
                res.status(200).json({
                    status:'SUCCESS',
                    message:"Signin successfully",
                    data:result,
                })
             }
             else
           {
                res.status(400).json({
                    status:"Failed",
                    message:"Invalid password"
                })
            }
            })
            .catch ((error) => {
                console.log(error)
                  res.status(500).json({
                    status: "Failed",
                    message: "Error occurred while comparing passwords",
                  });
        });
        }  
        else{
            res.status(500).json({
                status:"Failed",
                message:"Invalid email"
            })
         }
    })
    .catch( (error) => {
        console.log(error)
            res.status(500).json({
              status: "Failed",
              message: "Error occurred while finding user",
            });
          } )
  }
})

router.get('/find',(req,res)=>{
   

    user.find()
    .then(() => {users=>
     {if(user)
        {
                res.status(200).json({
                status:'SUCCESS',
                message:"fetch successfully",
                data:user,
            })
        }
         res.status(200).json(users)}
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch the users'})
    })
    res.json({msg: 'accces api'})
})

module.exports = router;