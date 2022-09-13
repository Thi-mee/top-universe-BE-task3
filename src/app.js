const express = require('express')
const router = require('./routes')
const { Profile } = require('./db/model')
var bodyParser = require('body-parser')
// const { QRCode } = require('qrcode')

// const Joi = require('joi');
const cors = require('cors')

  
const app = express()
const port = 3000

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Endpoints

app.use('/', router)

// == Create Profile ==
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

//  == Delete Profile ==
app.post('/profile/:id', (req, res) => {
    let id = req.params.id
    // for entry in mongodb == forEach(item =>{})

    Profile.findByIdAndDelete(id, (err, docs) => {
        if (err){
            res.send(err);
        }
        else{
            res.status(200).json(
                `Item with id ${id} deleted successfully`);
        }
    })
})

//  == Fetch Profiles == 
app.get('/profiles', (req, res) => {
    Profile.find({}, function(err, profiles){
        if (err){
            res.send(err)
        } else {
            res.statusCode = 200;
            res.send(profiles);
        }
    })
})

// == Search for Profile ==
app.get('/search', (req, res) => {
    let keys = req.query.key;
    let value = req.query.value;
    if (keys == "firstName"){
        Profile.find({ firstName: value }, function (err, profiles) {
            if (err) {
                res.send(err)
            } else {
                res.send(profiles);
            }
        });
    } else if (key == "lastName"){
        Profile.find({ lastName: value }, function (err, profiles) {
            if (err) {
                res.send(err)
            } else {
                res.send(profiles);
            }
        });
    } else {
        res.sendStatus(404)
    }
})

// Search ->   get '/search?key=firstName&value=john'

// Verify Data ->   post '/profile/verify' -> Json Body { "data" : "encryptedToken" } 

// Pagination & Sort ->   get '/proifles?sort=firstName:ASC&page=1&pageSize=10'


app.get('/', (req, res) => {
	successResponse(res, 'Welcome to My Task 3', [], 200)
})

app.use((req, res) => {
    res.status(404).json({
        status: 'failed',
        message: 'Not Found',
        data: 'Route does not exist'
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


module.exports = app