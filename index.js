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
    allowedHeaders: ['Content-Type', 'sandywhms-access-token']
};

const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
var rfs = require('rotating-file-stream')

// cors
app.use(cors(corsOptions));

var logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})
// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

// create user session - NO AUTHENTICATION REQUIRED
app.use((req, res, next)=>{
    req.user = {name:'admin', role: 'admin'}
    next();
})

// api/databases
app.use('/api/', (req, res, next)=> {
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