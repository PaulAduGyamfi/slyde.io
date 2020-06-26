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
        .populate("postedBy", "_id username fullname pic")
        .populate("comments.postedBy", "_id username fullname pic")
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






module.exports = router