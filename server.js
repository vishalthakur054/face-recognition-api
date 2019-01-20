const express = require('express');
const BodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/handleRegister');
const signin = require('./Controllers/handleSignin');
const image = require('./Controllers/handleImage');
const profile = require('./Controllers/handleProfile')


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1234',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(BodyParser.json());
app.use(cors());

const database = {
    users : [
        {
            id : '123',
            name : 'john',
            email : 'john@gmail.com',
            password : 'cookies',
            entries : 0,
            joined : new Date()
        },
        {
            id : '124',
            name : 'sally',
            email : 'sally@gmail.com',
            password : 'coffee',
            entries : 0,
            joined : new Date()
        }
    ]
}



app.get('/', (req,res)=>{ res.send(database.users) });
app.post('/signin' , (req,res) => {signin.handleSignin(req,res,db,bcrypt)});
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res) => {profile,handleprofile(req,res,db)})
app.put('/image',(req,res) => {image.handleImage(req,res,db)});
app.post('/imageurl',(req,res) => {image.handleAPICall(req,res)});
app.listen(process.env.PORT || 3000, ()=> {console.log('app is running on ${process.env.PORT}') });


//////////////// we need following end points////////////
//res --> this is working
// sign in --> post == success/fail for user with password
//registe --> new user -- Post
//profile/:userid --> Get = user
//image --> put --> user
///////////////////////////////////////////