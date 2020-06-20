const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/secure')

router.post('/signup', (req,res) => {
   const {firstname,lastname,username,email,password} = req.body
   if(!firstname || !lastname || !username || !email || !password){
      return res.status(422).json({
         error:"Please add all fields"
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
               firstname,
               lastname,
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

      if(username && !email){
         User.findOne({username:username})
         .then(savedUser => {
            if(!savedUser){
               return res.status(422).json({err:"Invalid username or password"})
            }
            bcrypt.compare(password, savedUser.password)
            .then(passwordMatch => {
               if(passwordMatch){
                  const token = jwt.sign({_id:savedUser._id},JWT_KEY)
                  res.json({token})
               }
               else{
                  return res.json({error:"Invalid username or password"})
               }
            })
            .catch(err => {
               console.log(err)
            })
         })
      }
      else if(!username && email){
         User.findOne({username:username})
         .then(savedUser => {
            if(!savedUser){
               return res.status(422).json({err:"Invalid email or password"})
            }
            bcrypt.compare(password, savedUser.password)
            .then(passwordMatch => {
               if(passwordMatch){
                  const token = jwt.sign({_id:savedUser._id},JWT_KEY)
                  res.json({token})
               }
               else{
                  return res.json({error:"Invalid email or password"})
               }
            })
            .catch(err => {
               console.log(err)
            })
         })
      }
   
   
   
})


module.exports = router


