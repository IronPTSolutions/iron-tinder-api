const mongoose = require('mongoose')

const likesSchema = new mongoose(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true  
    }, 
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true      
    },
    status: {
      type: boolean,
      required: true}
  }, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
)

const Like = moongose.model('Likes', likesSchema)
module.exports = Likes;