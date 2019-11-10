const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('./model/user.model');
const College = require('./college.side.model/college.model');
const Department = require('./college.side.model/department.model');
const Course = require('./college.side.model/course.model');
const Friend = require('./model/friend.model');
const Professor = require('./college.side.model/professor.model');
const File = require('./model/file.model');
const CollegeFile= require('./college.side.model/file.model');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};
const MIME_TYPE_MAP2 = {
    'application/pdf': 'pdf'
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/prof_image");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP2[file.mimetype];
        let error = new Error("Invalid MiME type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/studentFileUpload");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP2[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});
const storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP2[file.mimetype];
        let error = new Error("Invalid MiME type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/collegeFileUpload");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP2[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.post('/api/college', (req, res) => {
    const college = new College({
        Name: req.body.Name,
        address: req.body.address,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        rating: 0,
        password: req.body.password
    });
    college.save();
    res.status(200).json({
        messages: 'College Added'
    });
})

router.post('/api/department', (req, res) => {
    const department = new Department({
        col_id: req.body.col_id,
        dept_name: req.body.dept_name
    });
    department.save();
    res.status(200).json({
        messages: 'Department Added'
    });
})
router.get('/api/department', (req, res) => {
    Department.find({ 'col_id': req.query.collegeID }, function (error, result) {
        if (!result) {
            res.status(200).json({
                message: 'Departments Not Found',
                status: 404,
                departments: null
            });
        }
    }).then(documents => {
        res.status(200).json({
            message: 'Departments Found',
            status: 200,
            departments: documents
        });
    });
})
router.post('/api/course', (req, res) => {
    const course = new Course({
        dept_id: req.body.dept_id,
        name: req.body.name,
        credit: req.body.credit,
        semester: req.body.semester,
        prof: req.body.prof,
    });
    course.save();
    res.status(200).json({
        message: 'Course Added'
    });
})

router.post('/api/professor', multer({ storage: storage }).single("image"), (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    const imagepath = url + "/prof_image/" + req.file.filename;

    const professor = new Professor({
        col_id: req.body.col_id,
        Designation: req.body.Designation,
        First_Name: req.body.First_Name,
        Middle_Name: req.body.Middle_Name,
        Last_Name: req.body.Last_Name,
        Experience: req.body.Experience,
        prof_img: imagepath
    })
    professor.save();
    res.status(200).json({
        messages: 'Professor Added'
    });
})
router.post('/api/student/file/upload', multer({ storage: storage2 }).single("file"), (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    const imagepath = url + "/studentFileUpload/" + req.file.filename;

    const file = new File({
        username: req.body.username,
        filename: imagepath,
        description: req.body.Description
    });
    file.save();
    res.status(200).json({
        messages: 'File Added'
    });
})
router.post('/api/college/file/upload', multer({ storage: storage3 }).single("file"), (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    const imagepath = url + "/collegeFileUpload/" + req.file.filename;

    const file = new CollegeFile({
        col_id: req.body.col_id,
        filename: imagepath,
        description: req.body.Description
    });
    file.save();
    res.status(200).json({
        messages: 'File Added'
    });
});
router.get('/api/college/file/download/:id', (req, res, next) => {
    CollegeFile.findOne({ '_id': req.params.id }).then(documents => {
        const filename = documents.filename.substring(documents.filename.lastIndexOf('/') + 1);
        filepath = '/home/anushil/Project/backend/collegeFileUpload' + '/' + filename;
        res.sendFile(filepath);
    });
});

router.get('/api/student/friends/file/:username', (req, res) => {
    let doc = [];
    File.find().then(
        docs => {
            let flag = 0;
            async function firstAsync() {
                let promise = new Promise((res, rej) => {
                    docs.forEach(file => {
                        Friend.find({ 'username': req.params.username, 'friend': file.username }).then(documents => {
                            if (documents.length != 0) {
                                doc.push(file);
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
                    file: doc
                })
            }
            firstAsync();
        }
    );

})
router.get('/api/student/file/download/:id', (req, res, next) => {
    File.findOne({ '_id': req.params.id }).then(documents => {
        const filename = documents.filename.substring(documents.filename.lastIndexOf('/') + 1);
        filepath = '/home/anushil/Project/backend/studentFileUpload' + '/' + filename;
        res.sendFile(filepath);
    });
});

router.get('/api/college/file/:username',(req,res)=>{
    CollegeFile.find({'col_id':req.params.username}).then(docs=>{
        res.status(200).json({
            message: 'Files Received From College',
            files: docs
        });
    });
})
router.get('/api/college/file/download/:id', (req, res, next) => {
    CollegeFile.findOne({ '_id': req.params.id }).then(documents => {
        const filename = documents.filename.substring(documents.filename.lastIndexOf('/') + 1);
        //PLease makes sure that the file details are clear and correct. I have used a direct path to the file name
        filepath = '/home/anushil/Project/backend/collegeFileUpload' + '/' + filename;
        res.sendFile(filepath);
    });
});



router.get('/api/college', (req, res) => {
    College.findOne({ 'email': req.query.email, 'password': req.query.password }).then(documents => {
        if (documents.length === 0) {
            res.status(200).json({
                messages: 'College Not found',
                statuscode: 404,
                collegeId: null
            });
        }
        else {
            res.status(200).json({
                messages: 'College found',
                statuscode: 200,
                collegeId: documents._id
            });
        }
    });
})
router.get('/api/college/list',(req,res)=>{
    College.find().select('_id Name ').then(docs=>{
        res.status(200).json({
            message: 'Colleges Received',
            college: docs
        });
    })
})

router.get('/api/professor', (req, res) => {
    Professor.find().then(documents => {
        res.status(200).json({
            message: 'Professors has been Recieved',
            professor: documents
        });
    });
})


router.get('/api/course/:dept_id', (req, res) => {
    Course.find({'dept_id':req.params.dept_id}).then(documents => {
        res.status(200).json({
            message: 'courses Recieved',
            courses: documents,
            status: 200
        });
    });
})

router.get('/api/test/user',(req,res)=>{
    // File.deleteMany().then(res.send('Deleted'));
    CollegeFile.find().then(documents=>{res.send(documents)});
})

module.exports = router;
