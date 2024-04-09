const chemical = require('../model/chemical.model');
const Chemical = require('../model/chemical.model'); 
const { containsKeyword } = require('./chemical.savelogic');

async function handleCnamePostMethod(req, res) {
    const { commonname } = req.body;

    console.log(commonname);


    const chemical = await Chemical.findOne({
        commonName: { $regex: `\\b${commonname}\\b`, $options: 'i' }
    });

    console.log(`Regular Expression: \\b${commonname}\\b`);

    

    if (!chemical) {
        return res.status(404).json({
            msg: "Chemical not found"
        });
    }

    return res.status(200).json({
        msg: "Successfully retrieved chemical",
        chemical:{
            id: chemical._id,
            scientificName : chemical.scientificName,
            commanName : chemical.commonName,
            pdfPath : chemical.pdfPath
        }
    });
}


async function handleSnamePostMethod(req,res){
    const { sname } = req.body;

    console.log(sname);


    const chemical = await Chemical.findOne({
        scientificName: { $regex: `\\b${sname}\\b`, $options: 'i' }
    });

    console.log(`Regular Expression: \\b${sname}\\b`);

    

    if (!chemical) {
        return res.status(404).json({
            msg: "Chemical not found"
        });
    }

    return res.status(200).json({
        msg: "Successfully retrieved chemical",
        chemical:{
            id: chemical._id,
            scientificName : chemical.scientificName,
            commanName : chemical.commonName,
            pdfPath : chemical.pdfPath
        }
    });

}

async function handleChemicalPostRequest(req, res) {
  
    if (!req.body || !req.file) {
        return res.status(400).json({
            msg: "Both body and file are required"
        });
    }

    
    const { commanName, scientificName } = req.body;


    const { filename, path } = req.file;

   
    console.log("Comman Name:", commanName);
    console.log("Scientific Name:", scientificName);
    console.log("File Name:", filename);
    console.log("File Path:", path);


// const keywordString = "apple, banana, orange";
// const keyword = "banana";
// console.log(containsKeyword(keywordString, keyword)); 






    await Chemical.create({
        scientificName: scientificName,
        commonName: commanName,
        pdfPath : path
    });

 
    return res.status(200).json({
        msg: "successfully Posted pdf and data"
    });
}

async function sendFileHandler(req,res){
  try{
    const {id} = req.params;


    const data =  await chemical.findById(id);
    console.log(data);
 
    if(!data){
    return res.status(400).json({
         msg : "id not found"
     });
    }
 
    return res.status(200).sendfile(data.pdfPath);    
  }catch(e){
    console.log(e);
    return res.status(400).json({
        msg : "id not found"
    });
  }

}


module.exports = {
    handleCnamePostMethod,
    handleSnamePostMethod,
    handleChemicalPostRequest,
    sendFileHandler
}