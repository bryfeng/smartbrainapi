const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require ('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'asdf',
    database : 'smartbrain'
  }
})
//keep in mind knex queries are promises so you need to use .then

const app = express();
app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
	res.send(database.users);
})

//signin
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt/*dependency injection*/) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) // dependency injection

app.get('/profile/:id'/*setting colon ':' lets you enter anything*/, (req, res) => {profile.HandleProfile(req, res, db)})

app.put('/image',(req,res) => {image.handleImage(req, res, db)})

app.post('/imageurl',(req,res) => {image.handleApiCall(req, res)})



app.listen(3001, ()=>{
	console.log('app is running on port 3001');
})


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/