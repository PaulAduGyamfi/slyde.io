const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    body: {
        type:String,
        required:false
    },
    media: {
        type:String,
        default:"N/a"
    },
    likes:[{type:ObjectId,ref:"User"}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    postedBy: {
        type:ObjectId,
        ref:"User"
    },
   
},{timestamps:true})

mongoose.model("Post", postSchema)