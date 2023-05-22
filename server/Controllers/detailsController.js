// detailsController.js
const details = require('../Models/patientDetailsSchema');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const multer = require('multer');
const fs=require('fs')
const { log } = require('console');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

// const secretKey = 'mysecretkey';
// const algorithm = 'aes-256-cbc';


var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


// Encrypt function
function encrypt(text) {
  // Generate a random initialization vector (IV)
  // const iv = crypto.randomBytes(16);

  // Create a cipher object
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  // Encrypt the text
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  // Return the encrypted text and IV
  return { encrypted, iv: iv.toString('hex') };
}

// Decrypt function
function decrypt(encrypted, iv) {
  // Create a decipher object
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

  // Decrypt the text
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  // Return the decrypted text
  return decrypted;
}



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      console.log("Hello I am in the storage  ..........");
      cb(null, "local_storage/temp");
    }
    catch (err) {
      console.log("Error while Uploading")
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname
    );
  }
});

const maxSize = 25 * 1024 * 1024; //25Mb size

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      console.log('report-error', "Report should be in .pdf or .docx format");

      cb(null, false);
    }
  },
  limits: { fileSize: maxSize },
});

var multipleUpload = upload.fields([
  { name: "fileSave", maxCount: 5 },
]);


exports.detailsSave = async (req, res) => {
  try {
    await multipleUpload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: 'File upload error' });
      }

      console.log("Hello World");
      console.log(req.files);

      // rest of your code goes here...
    var pid = "";
    if (req.body.pname != null || req.body.pname != "" || req.body != 0)
      pid = (req.body.pname) + Math.floor(Math.random() * 100) + 1 + (req.body.age);

    const path = `local_storage/${pid}/reports/`
    // var fileSavepath = `${pid}/${pdfog}`
    console.log(path);
      fs.access(path, (error) => {
      if (error) {
        // If current directory does not exist then create it
         fs.mkdir(path, { recursive: true }, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Creating folders");
            fs.readdirSync('local_storage/temp').forEach(file => {
              fs.renameSync('local_storage/temp/' + file, path+ file)
            })
          }
        })
      }
      else {
        console.log("Given Directory already exists !!");
        fs.readdirSync('local_storage/temp').forEach(file => {
          fs.renameSync('local_storage/temp/' + file, path + file)
        })
      }
    })
    

// console.log(files);
    console.log("Files in details ..............................");
    var filesData=[]
    for (let i = 0; i < req.files.fileSave.length; i++) {
      filesData.push(req.files.fileSave[i].filename)
      }

    console.log(filesData);



const text = req.body.desc;
const { encrypted, iv } = encrypt(text);
// const decrypted = decrypt(encrypted, iv);

console.log('Original text:', text);
console.log('Encrypted text:', encrypted);


var mailOptions = {
  from: ` "Medicrypt ID" <wceit101@gmail.com>`,
  to: 'abhishekdeokar782@gmail.com',
  subject: "wceit101 - This is ID for your report at MediCrypt",
  html: `<h2> Hello !!</h2>
            <h3>Pease use this ID for joining the sesssion</h3>
          <h3>${secretKey.toString('base64')}</h3>`,
};


// sending mail
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("email is sent to your gmail account !!");
  }
});
    
    await details.create({
      patientId: pid,
      patientName: req.body.pname,
      patientAge: req.body.age,
      patientWeight: req.body.weight,
      description: encrypted,
      medicines: req.body.prescription,
      tests: req.body.tests,
      email: req.body.email,
      reports:filesData,
      filePath:path
    });
    res.json({ success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.detailsFetch = async (req, res) => {

  
    const data = await details.find({}).sort({createdAt: 'desc'});
    console.log(data);
    res.json(data);
  

}  