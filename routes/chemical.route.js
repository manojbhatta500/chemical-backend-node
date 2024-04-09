const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'pdfdata/', // Destination folder
  filename: function(req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + extension);
  }
});

const pdfdata = multer({ storage: storage });

const {handleCnamePostMethod,handleChemicalPostRequest,handleSnamePostMethod,sendFileHandler} = require('../controller/chemical.controller');


const router = express.Router();





router.post('/cname',handleCnamePostMethod);

router.post('/sname',handleSnamePostMethod);


router.get('/pdf/:id',sendFileHandler)



router.use(express.urlencoded({ extended: true }));
router.post('/', pdfdata.single('file'),handleChemicalPostRequest);



module.exports = router;