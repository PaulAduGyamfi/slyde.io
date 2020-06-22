const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const RequireLogin = require('../middleware/RequireLogin')


router.get('/allposts', (req,res) => {
    Post.find()
    .populate("postedBy", "_id username")
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/createpost',RequireLogin,(req,res) => {
    const {body,pic} = req.body
    if(!body){
      return res.status(422).json({error:"please write something first"})
    }
    req.user.password = undefined
    const post = new Post({
        body:body,
        media:pic,
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

router.get('/myposts',RequireLogin,(req,res) => {
    Post.find({postedBy:req.user._id})
    .populate("postedBy", "_id username")
    .then(mypost => {
        res.json({mypost})
    })
    .catch(err => {
        console.log(err)
    })
})


module.exports = router