const express = require('express');
const cors = require('cors'); // Import cors
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');

require('./db.js');      //importing db.js file and establishing connection with mongodb

var employeeController = require('./controllers/employeeController.js');

var app = express();        //express function is saved inside variable app
//now we have to configure express middleware in order to send json data to nodejs project


app.use(bodyparser.json());
app.use(cors({ origin: ['http://localhost:4200', 'http://localhost', 'https://employee-management-system-rho-silk.vercel.app'] })); // Allow your Angular port


const SECRET_KEY = 'mySecretKey123';


// sending jwt token to user/localstorage
app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    if (email == 'admin@TestBed.com' && password=='1234'){
        const token = jwt.sign({email: email}, SECRET_KEY, {expiresIn: '1h'});
        res.json({token: token});
    } else {
        res.status(401).json({message: 'Invalid Credentials'});
    }
});

//in order to start express server, we call function below
app.listen(3000, ()=> console.log('Server started at port : 3000'));


// app.use('/employees', employeeController); // /Any request to /employees → handled by employeeController.


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];                // bearer eyjhgdfjghf...
    const token = authHeader && authHeader.split(' ')[1];           // eyjhgdfjghf...

    if (!token) return res.status(401).json({message: 'No token provided'});

    jwt.verify(token, SECRET_KEY, (err, decoded)=>{
        if (err) return res.status(403).json({message: 'Invalid token'});
        req.user = decoded;
        next();
    });
};

app.use('/employees', verifyToken, employeeController);
