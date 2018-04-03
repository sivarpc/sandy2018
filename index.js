/***************************************************************************
*@name: app-designer rest api
*@description: 
*@author: chsivarajendraprasad@gmail.com
***************************************************************************/
const express = require('express');
const app = express();  
const cors = require('cors')
const corsOptions = {
    // origin: true,
    allowedHeaders: ['Content-Type', 'x-access-token']
};


// cors
app.use(cors(corsOptions));

// create user session - NO AUTHENTICATION REQUIRED
app.use((req, res, next)=>{
    req.user = {name:'admin', role: 'admin'}
    next();
})

// api/databases
app.use('/api', (req, res, next)=> {
    return res.json({error:"", data: "", message: "hello world"})
});


const port = process.env.PORT || 3000;
const config = {enableSSL: false}

if(config.enableSSL){
	// SSL enabled
	const https = require('https');
	const fs = require('fs');
	var options = {
	    key: fs.readFileSync('./certificates/private.key'),
	    cert: fs.readFileSync('./certificates/onboarding.crt')
	}
	https.createServer(options, app).listen(port, function(){
	    console.log('Secure: Server listening @: '+port)
	});

}else{
	// SSL disabled
	app.listen(port, function(){
		console.log('Non-Secure: Server listening @: '+port)
	});
}