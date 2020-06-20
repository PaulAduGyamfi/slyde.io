const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')

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


module.exports = router



/*



 User.findOne({email:email})
   .then(savedUser => {
      if(savedUser){
         return res.status(422).json({
            error:"An account with that email already exists"
         })
      }
   })
   .then(() => {
      User.findOne({username:username})
      .then(savedUser => {
         if(savedUser){
            return res.status(422).json({
               error:"An account with that username already exists"
            })
         }
         const user = new User({
            firstname,
            lastname,
            username,
            email,
            password
         })
      
         user.save()
         .then(user => {
            res.json({
               message:"Great you're all signed up"
            })
         })
         .catch
      })
      .catch
      
   })
   
 */