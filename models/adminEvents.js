const mongoose=require('mongoose');
const eventsSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,'Event Title must Required'],
     minlength: [15, 'Short description must be at least 25 characters'],
     maxlength: [100, 'Short description cannot exceed 500 characters']
  },
  shortDescription:{
    type:String,
    required:[true,'Event Short Description must Required'],
    minlength: [25, 'Short description must be at least 25 characters'],
    maxlength: [5000, 'Short description cannot exceed 5000 characters']
  },
  longDescription:{
    type:String,
    required:[true,'Event Long Description must Required'],
    minlength: [25, 'Long description must be at least 25 characters'],
    maxlength: [10000, 'Long description cannot exceed 1000 characters']
  },
  pic:{
    type:String,
    required:[true,'Event Pic  must Required']
  },
  date:{
    type:Date,
    required:[true,'Event date must Required']
  },
  createdBy:{
    type:String,
  },
  updatedBy: {
  type: String
    },
  active:{
    type:Boolean,
    required:[true,'Event active status must Required']
  },
},{timestamps:true})

//Model export
// Export the Event model based on eventsSchema.
// Mongoose will automatically create/use the 'events' collection in MongoDB
// (model name 'Event' → pluralized & lowercased to 'events').
module.exports = mongoose.model('Event', eventsSchema);
//OR
// let Events=new mongoose.model('Events',eventsSchema)
// module.export=Events
