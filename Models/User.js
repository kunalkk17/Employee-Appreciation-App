const mongoose=require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type:String, required:true},
    userName: {type:String, required:true},
    employeeId:{type:Number,required:true},
    department: {type:String, required:true},
    team: {type:String, required:true},
    teamLead: {type:String, required:true},
    emailId: {type:String, required:true},
    password: {type:String, required:true},
    coinBalance:{type:Number, default:100},
    coinType:{Platinum:{type:Number,default:20},
    Gold:{type:Number,default:30},
    Silver:{type:Number,default:50}
     },
     rewardCoinType:{Platinum:{type:Number,default:0},
     Gold:{type:Number,default:0},
     Silver:{type:Number,default:0}
      },
    rewards:{type:Number, default:0},
    rewardsHistory:[],
    coinHistory:[],
    date: {type:Date, default:Date.now}
})

module.exports= User = mongoose.model("users1",UserSchema)