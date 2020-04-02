const mongoose=require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type:String, required:true},
    userName: {type:String, required:true},
    employeeId:{type:Number,required:true},
    password: {type:String, required:true},
    date: {type:Date, default:Date.now}
})

module.exports= User = mongoose.model("users0",UserSchema)