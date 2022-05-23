const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({

  name:{
        type:String,required:[true,"Name cant be empty"],
        trim:true,
        maxlength: [30, 'Length cannot exceed 30 letters']
    },

  completed:{
      type: Boolean,
      default:false
    }

})

module.exports = mongoose.model('Task',TaskSchema)