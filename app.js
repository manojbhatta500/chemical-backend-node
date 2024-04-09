const express = require('express');
const chemicalRoute = require('./routes/chemical.route');
const mongoose = require('mongoose');

app = express();

mongoose.connect('mongodb://127.0.0.1:27017/chemicals').then(()=>{
    console.log('mongodb connected .......');
});



app.use(express.json(),express.urlencoded());


app.use('/lazy',(req,res)=>{
    res.send('thok thok thok');
})

app.use('/chemical',chemicalRoute);


const port = 3000
app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})





