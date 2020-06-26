const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const RequireLogin = require('../middleware/RequireLogin')


router.get('/allposts',RequireLogin,(req,res) => {
    Post.find()
    .populate("postedBy", "_id username fullname pic")
    .populate("comments.postedBy", "_id username fullname pic")
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})
router.get('/followingposts',RequireLogin,(req,res) => {
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy", "_id username fullname pic")
    .populate("comments.postedBy", "_id username fullname pic")
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
    .populate("postedBy", "_id username fullname pic")
    .populate("comments.postedBy", "_id username fullname pic")
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
    .populate("comments.postedBy", "_id username fullname")
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
    .populate("comments.postedBy", "_id username fullname")
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
    }).populate("postedBy", "_id username fullname")
    .populate("comments.postedBy", "_id username fullname")
    .exec((err,result) => {
        if(err){
            res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


router.delete('/deletepost/:postId',RequireLogin,(req,res) => {
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post) =>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
        }
    })
})


module.exports = router