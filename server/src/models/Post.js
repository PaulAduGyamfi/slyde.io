const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    body: {
        type:String,
        required:true
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
    }
   
})

mongoose.model("Post", postSchema)