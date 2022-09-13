const mongoose = require('mongoose');
const Joi = require('joi');

// Connection to QRProfile DB with URL
mongoose.connect("mongodb://localhost:27017/QRProfile", { useNewUrlParser: true })

var date =  new Date;

const profile = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateCreated: {
        type: String,
        default: date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()
    }
})

// const addProfileSchema = {
//     schema: Joi.object().keys({
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         dateCreated: Joi.string().default(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate())
//     }),
//     message: 'Error adding profile'
// }

const Profile = mongoose.model("Profile", profile);

module.exports = { Profile };