const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    desc:{
      type: String,
      required: [true, 'Please add a text value'],
    },
    price:{
      type: Number,
      required: [true, 'Please add a text value'],
    },
    
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Category', categorySchema)
