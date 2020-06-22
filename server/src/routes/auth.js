const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/secure')
const RequireLogin = require('../middleware/RequireLogin')



router.post('/signup', (req,res) => {
   const {fullname,username,email,password} = req.body
   if(!fullname || !username || !email || !password){
      return res.status(422).json({
         error:"* Please complete all fields before attempting to signup *"
      })
   }
  User.findOne({email:email})
  .then(savedUser => {
     if(savedUser){
        return res.status(422).json({error:"An account with that email already exists"})
     }
     User.findOne({username:username}).then(savedUser => {
        if(savedUser){
           return res.status(422).json({error:"An account with that username already exists"})
        }
        bcrypt.hash(password,13)
        .then(hasedPassword => {

            const user = new User({
               fullname,
               username,
               email,
               password:hasedPassword
            })
            user.save()
            .then(user => {
               return res.json({message:"You have successfully signed up!"})
            })
            .catch(err => {
               console.log(err)
            })

        })
        
     })
     .catch
  })
  .catch
})

router.post('/signin',(req,res) => {
   const {username,email,password} = req.body
   if(!username && !email){
      return res.status(422).json({error:"A username or email is required to login"})
   }
   if( ((!username && email) && !password ) || ((username && !email) && !password ) ){
      return res.status(422).json({error:"Please provide password"})
   }

      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(username)){
         User.findOne({username:username})
         .then(savedUser => {
            if(!savedUser){
               return res.status(422).json({error:"The username and password you entered did not match our records. Please double-check and try again."})
            }
            bcrypt.compare(password, savedUser.password)
            .then(passwordMatch => {
               if(passwordMatch){
                  const token = jwt.sign({_id:savedUser._id},JWT_KEY)
                  const {_id,username,email,fullname} = savedUser
                  res.json({token, user:{_id,username,email,fullname}})
               }
               else{
                  return res.json({error:"The username and password you entered did not match our records. Please double-check and try again."})
               }
            })
            .catch(err => {
               console.log(err)
            })
         })
      }
      else{
         User.findOne({email:email})
         .then(savedUser => {
            if(!savedUser){
               return res.status(422).json({error:"The username and password you entered did not match our records. Please double-check and try again."})
            }
            bcrypt.compare(password, savedUser.password)
            .then(passwordMatch => {
               if(passwordMatch){
                  const token = jwt.sign({_id:savedUser._id},JWT_KEY)
                  const {_id,username,email,fullname} = savedUser
                  res.json({token, user:{_id,username,email,fullname}})
               }
               else{
                  return res.json({error:"The username and password you entered did not match our records. Please double-check and try again."})
               }
            })
            .catch(err => {
               console.log(err)
            })
         })
      }
   
   
   
})


module.exports = router


