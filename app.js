var express = require('express'), app = express() 
app.use('/', express.static('public'));



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Running server on 🚀. \nListening on ${ PORT } 👂`));



