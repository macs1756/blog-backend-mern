import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    default: ''
  },

  views: {
    type: Number,
    default: 0,
  },

  autor: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
  }]

}, { timestamps: true })

export default mongoose.model('Post', postSchema)
