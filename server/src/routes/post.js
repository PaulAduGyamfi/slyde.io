const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const RequireLogin = require('../middleware/RequireLogin')




router.post('/createpost',RequireLogin,(req,res) => {
    const {body} = req.body
    if(!body){
      return res.status(422).json({error:"please write something first"})
    }
    req.user.password = undefined
    const post = new Post({
        body,
        postedBy:req.user
    })
    post.save()
    .then(result => {
        res.json({post:result})
    })
    .catch(err => {
        console.log(err)
    })
})


module.exports = router