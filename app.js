const express = require('express');
const app = express();

const path = require('path');


const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const pug = require('pug');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
const db = require("./database");

const Joi = require('joi');


const collection = "Products";






app.get('/', (req,res,next) => {
    res.render('home');
})

app.get('/posts', (req,res,next) => {
    db.getDB().collection("Posts").find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.render('posts', {users: documents});

            
        }
    });
    
});
app.get('/posts/:id',(req,res,next) => {
    db.getDB().collection("Posts").find({"_id":req.params.id},(err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.render('postinside', {users: documents});
            console.log(documents.body);
            
        }
    });
})



app.get('/products', (req,res,next) => {
    
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.render('products', {users: documents});

            
        }
    });
})

app.param('id', function(req,res,next,id){
    next();
    
})
app.get('/products/:id', (req, res,next) => {
    db.getDB().collection(collection).find({"_id":req.params.id},(err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.render('productinside', {users: documents});
            console.log(documents.body);
            
        }
    });
    
    });

    


app.get('/create', (req,res,next) => {
    res.render('create')
})
app.get('/createpost',(req,res,next) =>{
    res.render('createpost');
})
app.post('/createpost', (req,res,next) => {
    const userInput = req.body;

    
    
            db.getDB().collection("Posts").insertOne(userInput,(err,result)=>{
                if(err){
                    const error = new Error("Failed to insert Todo Document");
                    error.status = 400;
                    next(error);
                }
                else
                    
                    res.redirect('/posts');
                    
            });


});
app.post('/create', (req,res,next) => {
    const userInput = req.body;

    
    
            db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
                if(err){
                    const error = new Error("Failed to insert Todo Document");
                    error.status = 400;
                    next(error);
                }
                else
                    
                    res.redirect('/products');
                    
            });
        
    
    
});


 
app.get('/signin',(req,res,next) => {
    res.render('login');
})

app.get('/signup',(req,res,next) => {
    res.render('register');
})
db.connect((err)=>{
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    
    else{
        app.listen(3000,()=>{
            console.log('connected to database, app listening on port 3000');
        });
    }
})








