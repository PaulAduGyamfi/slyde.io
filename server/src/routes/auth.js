const express = require('express')
const router = express.Router()

router.post('/signup', (req,res) => {
   const {firstname,lastname,username,email,password} = req.body
   if(!firstname || !lastname || !username || !email || !password){
      return res.status(422).json({
         error:"Please add all fields"
      })
   }
   res.json({
      message:"You have successfully signed up"
   })
})

module.exports = router