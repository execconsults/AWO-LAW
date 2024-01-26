const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOveride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const ExpressError = require('./views/utilities/ExpressError')
const passport = require('passport')
const path = require('path')
const ejsMate = require('ejs-mate')
const bodyParser = require('body-parser')
const catchAsync = require('./views/utilities/catchAsync')
const axios = require('axios')

const LocalStrategy = require('passport-local')

//Session for login if nedded
const sessionConfig = {
   secret: 'thisshouldbebetter',
   resave: false,
   saveUninitialized: true,
   cookie: {
     httpOnly: true,
     expires: Date.now() + 100 * 60 * 60 * 24 * 7,
     maxAge: 100 * 60 * 60 * 24 * 7,
   },
 
 };


app.set('views engine','ejs')
app.set('views', path.join(__dirname, 'views')); 

app.engine('ejs',ejsMate)
app.use(express.static('layouts'))
app.use(express.static('js'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session(sessionConfig));
app.use(flash())
const sessionMiddleware = session(sessionConfig);

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));   
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use(async (req, res, next) => {
   res.locals.success = req.flash('success');
   res.locals.warning = req.flash('warning');
   res.locals.error = req.flash('error');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//Home route
app.get('/',(req,res) =>{
   res.send('ok')
    
 })

 app.get('/n',(req,res) =>{
   res.send('wow')
    
 })
app.all('*', (req,res,next)=>{w
    next(new ExpressError('Page Not Found', 404))
 })
 // error hadling 
 app.use((err, req, res, next) =>{
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
 
    res.status(statusCode).render('error.ejs', { err })
 })
 

 // 
 //server
 app.listen(3000, () => {
    console.log('Serving on port 3000')
 })