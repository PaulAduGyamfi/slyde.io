const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const RequireLogin = require('../middleware/RequireLogin')
const User = mongoose.model("User")




router.get("/user/:id",RequireLogin,(req,res) => {
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user =>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy", "_id username fullname pic banner")
        .populate("comments.postedBy", "_id username fullname pic banner")
        .exec((err,posts) => {
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
       
    }).catch(err =>{
        return res.status(404).json({error:"User not found"})
    })
})



router.put('/follow',RequireLogin,(req,res) => {
        User.findByIdAndUpdate(req.body.followId,{
             $push:{followers:req.user._id}
        },{new:true},(err,reult)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            User.findByIdAndUpdate(req.user._id,{
                $push:{following:req.body.followId}
            },{new:true}).select("-password").then(result => {
                res.json(result)
            }).catch(err => {
                return res.status(422).json({error:err})
            })
        })
})
router.put('/unfollow',RequireLogin,(req,res) => {
        User.findByIdAndUpdate(req.body.unfollowId,{
             $pull:{followers:req.user._id}
        },{new:true},(err,reult)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            User.findByIdAndUpdate(req.user._id,{
                $pull:{following:req.body.unfollowId}
            },{new:true}).select("-password").then(result => {
                res.json(result)
            }).catch(err => {
                return res.status(422).json({error:err})
            })
        })
})


router.put('/updatebanner',RequireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{banner:req.body.banner}},{new:true},
        (err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json(result)
    })
})


router.put('/updateprofilepic',RequireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json(result)
    })
})


router.post('/search',(req,res)=>{
    let usePattern = new RegExp(["^", req.body.query].join(""), "i");
    User.find({fullname:{$regex:usePattern}})
    .select("_id fullname username pic")
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })
})



module.exports = router