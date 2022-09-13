const express = require('express')
const router = express.Router()
const { Profile } = require('../db/model')

router.post(
    '/profile',
    (req, res) => {
        let newprofile = req.body;
    
        // const isValid = Joi.validate(newprofile, addProfileSchema)
        const profile = new Profile(newprofile);
        profile.save((err, doc) => {
            if (err){
                res.send(err)
            } else[
                res.json({
                    newprofile,
                    success: "New profile created successfully"
                })
            ]
        });
    }
)
// app.post('/profile', (req, res) => {
//     let newprofile = req.body;

//     // const isValid = Joi.validate(newprofile, addProfileSchema)
//     const profile = new Profile(newprofile);
//     profile.save((err, doc) => {
//         if (err){
//             res.send(err)
//         } else[
//             res.json({
//                 newprofile,
//                 success: "New profile created successfully"
//             })
//         ]
//     });
    
// })