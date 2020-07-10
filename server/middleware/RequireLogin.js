const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/secure')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req,res,next) => {
    const { authorization } = req.headers
    if(!authorization){
        return res.status(401).json({error:"you must be logged in to access this page"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token, JWT_KEY,(err,payload) => {
        if(err){
            return res.status(401).json({error:"you must be logged in to access this page"})
        }
        const { _id } = payload
        User.findById(_id).then(userData => {
            req.user = userData
            next()
        })
    })
}