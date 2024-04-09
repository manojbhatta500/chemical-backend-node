const mongoose = require('mongoose');
const { Schema } = mongoose;




const chemicalSchema = new Schema({
    scientificName:
        {
            type: String,
            required: true
        }
    ,
    commonName: 
        {
            type: String,
            required: true
        }
    ,
    pdfPath : {
        type: String,
        required: true
    }
});


const chemical = mongoose.model('chemical',chemicalSchema);



module.exports = chemical;