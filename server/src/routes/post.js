const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const RequireLogin = require('../middleware/RequireLogin')


router.get('/allposts',RequireLogin,(req,res) => {
    Post.find()
    .populate("postedBy", "_id username fullname")
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
    .populate("postedBy", "_id username fullname")
    .then(mypost => {
        res.json({mypost})
    })
    .catch(err => {
        console.log(err)
    })
})

router.put("/like",RequireLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy", "_id username fullname")
    .exec((err,result) => {
        if(err){
            res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put("/unlike",RequireLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy", "_id username fullname")
    .exec((err,result) => {
        if(err){
            res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


router.put("/comment",RequireLogin,(req,res) => {
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    }).populate("comments.postedBy", "_id username fullname")
    .exec((err,result) => {
        if(err){
            res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


module.exports = router