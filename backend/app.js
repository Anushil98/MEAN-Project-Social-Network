const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const User = require('./model/user.model');
const Achievement = require('./model/Achievement.model');
const Post = require('./model/post.model');
const Friend = require('./model/friend.model');
const multer = require('multer');
const path = require('path');
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

app.use(bodyparser.json());
app.use('/images/', express.static(path.join("backend/images")));
app.use('/prof_image/', express.static(path.join("backend/prof_image")));
app.use('/studentFileUpload/', express.static(path.join("backend/studentFileUpload")));

mongoose.connect('mongodb+srv://<username:password>@cluster0-yo6mk.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected To database');
    })
    .catch(() => {
        console.log('Connection Failed');
    });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    next();
});

app.post("/api/upload", multer({ storage: storage }).single("image"), (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    const imagepath = url + "/images/" + req.file.filename;
    User.updateOne({ 'username': req.body.username }, { $set: { 'profilepic': imagepath } }, function (error, result) {
        if (result) {

        }
    }).then(
        res.status(200).json({
            message: 'picture added succesfully'
        })
    );
});

app.post("/api/users", (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const imagepath = url + "/images/" + 'blank-profile.png';
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        Address: null,
        Institution: null,
        First_name: null,
        Last_name: null,
        DOB: null,
        profilepic: imagepath
    });
    user.save();
    res.status(201).json({
        message: 'User added succesfully'
    });
});
app.post('/api/user/addDetail',(req,res)=>{
    console.log(req.body);
    User.updateOne({'username':req.body.username}, { $set: {'Institution': req.body.institute,'Address': req.body.Address,'First_name': req.body.First_Name,'Last_name': req.body.Last_Name,'DOB':req.body.DOB } })
    .then(res.status(200).json({
        message:'Updated Successfully'
    })
    );
})
app.get('/api/:user/institution',(req,res)=>{
    User.find({'username':req.params.user}).select('Institution -_id').then(docs=>{
        res.status(200).json({
            message: 'institute received of user',
            institute: docs
        })
    })
})
app.get('/api/users', (req, res, next) => {
    User.findOne({ 'username': req.query.username, 'password': req.query.password },
        function (err, result) {
            if (!result) {
                res.status(200).json({
                    message: 'User Not Found',
                    status: 404
                });
            }
            if (result) {
                res.status(200).json({
                    message: 'User Found',
                    status: 200
                });
            }
        }
    );
});
app.post('/api/posts', (req, res) => {
    const post = new Post({
        username: req.body.username,
        title: req.body.title,
        content: req.body.content,
        likes: req.body.likes
    });
    post.save();
    res.status(200).json({
        message: 'Post Added'
    });
});

app.get('/api/posts', (req, res) => {
    Post.find({ 'username': req.query.user }, function (error, result) {
        if (!result) {
            res.status(200).json({
                message: 'No posts for this user',
                post: null,
                status: 404
            })
        }
    }).then(documents => {
        res.status(200).json({
            message: 'Posts Recived',
            post: documents,
            status: 200
        });
    });
});

app.post('/api/:user/Achievement', (req, res) => {
    const Ach = new Achievement({
        Username: req.body.username,
        Certificate_no: req.body.Certificate_no,
        Certificate_Name: req.body.Certificate_Name,
        Issued_By: req.body.Issued_By,
        Date_Of_Issue: req.body.Date_Of_Issue
    });

    Ach.save();
    res.status(200).json({
        message: 'Achievement Added Succesfully'
    });
});

app.get('/api/:user/Achievement', (req, res) => {
    Achievement.find({ 'Username': req.params.user }, function (error, result) {
        if (!result) {
            res.status(200).json({
                message: 'Achievement Recived',
                certificate: null,
                status: 404
            });
        }
    })
        .then(documents => {
            res.status(200).json({
                message: 'Achievement Recived',
                certificate: documents,
                status: 200
            });
        });
});

app.get('/api/search/user', (req, res) => {
    User.find({ 'username': { $regex: req.query.user, $options: 'i' } }, function (error, result) {
        if (!result) {
            res.status(200).json({
                message: 'Search Recived',
                Searchresults: null,
                status: 404
            });
        }
    })
        .select('profilepic username -_id').limit(5)
        .then(documents => {
            res.status(200).json({
                message: 'Search recieved',
                Searchresults: documents,
                status: 200
            });
        });
});

app.post('/api/users/friend', (req, res) => {
    const dost = new Friend({
        username: req.body.username,
        friend: req.body.friend
    });
    console.log(dost);
    dost.save();
    res.status(200).json({
        message: 'Friend Added'
    })
});

app.get('/api/users/friend', (req, res) => {
    Friend.find({ username: req.query.username, friend: req.query.friend }).then(documents => {
        if (documents.length != 0) {
            res.status(200).json({
                status: 404
            });
        }
        else {
            res.status(200).json({
                status: 200
            });
        }
    });
});

app.get('/api/test', (req, res) => {
    Friend.find().then(documents => {
        res.status(200).json({
            testdata: documents
        });
    });
})
app.get('/api/like/:id', (req, res) => {


    // Post.updateOne({'_id': req.params.id},{ $set: {'likes':'0'}},function(error,result){
    //     if(result){
    //         console.log('hey');
    //     }
    // })

    let likes = 0;
    let like = "";
    Post.findOne({ '_id': req.params.id }).then(doc => {
        likes = parseInt(doc.likes);
        likes = likes + 1;
        like = likes.toString(10);
        Post.updateOne({ '_id': req.params.id }, { $set: { 'likes': like } }).then(
            res.status(200).json({
                message: 'Liked',
                id: doc._id,
                likes: like
            })
        );
    });

});

app.get('/api/:username/friend', (req, res) => {
    let doc = [];
    Post.find().then(
        docs => {
            let flag = 0;
            async function firstAsync() {
                let promise = new Promise((res, rej) => {
                    docs.forEach(post => {
                        Friend.find({ 'username': req.params.username, 'friend': post.username }).then(documents => {
                            if (documents.length != 0) {
                                doc.push(post);
                            }
                            flag = flag + 1;
                            if (flag === docs.length) {
                                res(true);
                            }

                        });
                    });
                });
                // wait until the promise returns us a value
                let result = await promise;

                // "Now it's done!"
                res.status(200).json({
                    post: doc
                })
            }
            firstAsync();
        }
    );
});

//get profile picture
app.use('/api/:username/profilepic',(req,res)=>{
    User.find({'username':req.params.username}).select('profilepic -_id').then(document=>{
        res.status(200).json({
            profilepic: document
        });
    });
});
//this is temporary
// app.delete("/api/delete/user",(req,res)=>{
//     User.deleteOne({'username':req.query.username}).then(
//         res.status(200).json({
//             message: 'User'+req.query.username+ 'Deleted'
//         })
//     );
// });

const router = require('./college.app');

app.use(router);
module.exports = app;


