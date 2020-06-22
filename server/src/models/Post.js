const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    body: {
        type:String,
        required:true
    },
    media: {
        type:String,
        default:"n/a"
    },
    postedBy: {
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Post", postSchema)