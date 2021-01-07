const express = require('express') 
const path = require('path') 
const session = require('express-session')
const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://amrhoballah:tesco2012@project.uutww.mongodb.net/project?retryWrites=true&w=majority'
const database = new MongoClient(uri)
const app = express() 

app.use(express.urlencoded());
app.use(express.static('public'))
app.use(express.json());
app.use(session({
    secret : "shhhhh",
    resave : true,
    saveUninitialized : false
}))
  
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 


app.get('/', async(req, res) =>{ 
    try {
        await database.connect();
    } catch (error) {
        console.log(error);
    }
    res.render('login',{message : ""}) 
}) 
app.get('/registration', function(req, res){ 

    res.render('registration', {message: ""}) 
})
app.get('/dune', function(req, res){ 

    res.render('dune', {message: ""}) 
}) 
app.get('/fiction', function(req, res){ 

    res.render('fiction') 
})
app.get('/flies', function(req, res){

    res.render('flies', {message: ""}) 
}) 
app.get('/grapes', function(req, res){ 

    res.render('grapes',{message: ""})
}) 
app.get('/home', function(req, res){ 

    res.render('home') 
}) 
app.get('/leaves', function(req, res){ 

    res.render('leaves', {message: ""}) 
}) 
app.get('/mockingbird', function(req, res){ 

    res.render('mockingbird', {message: ""}) 
}) 
app.get('/novel', function(req, res){ 

    res.render('novel') 
}) 
app.get('/poetry', function(req, res){ 

    res.render('poetry') 
}) 
app.get('/readlist', async(req, res) =>{ 
    var data
    try{
        data = await database.db("Users").collection("Users").findOne({username: req.session.name})
    }
    catch(error){
        console.log(error)
    }
    res.render('readlist',{data: data.readinglist })
}) 
app.get('/searchresults', function(req, res){ 

    res.render('searchresults',{data:[]}) 
}) 
app.get('/sun', function(req, res){ 

    res.render('sun', {message: ""}) 
})

app.post('/register', async(req, res) =>{
    var user = {username: req.body.username, password: req.body.password, readinglist: []}
    var result
    try{
        result = await database.db("Users").collection("Users").findOne({username: user.username})
    }
    catch(error){
        console.log(error)
    }
    if (result){
        res.render('registration',{message : "This username is already taken"})
        return;
    }
    if (user.username == "" || user.password == ""){
        res.render('registration',{message : "Please enter a username and a password"})
        return;
    }

    try{
        await database.db("Users").collection("Users").insertOne(user)
    }
    catch(error){
        console.log(error)
    }
    res.render('login',{message : "You have registered successfully"})
    
})
app.post('/login',async (req, res) =>{
    var user = {username: req.body.username, password: req.body.password}
    var result
    try{
        result = await database.db("Users").collection("Users").findOne({username : user.username, password: user.password})
    }
    catch(error){
        console.log(error)
    }
    if (result){
        req.session.name = user.username
        res.render('home')
        return
    }
    res.render('login',{message : "The username or password are incorrect"})
})
app.post('/addtoreadinglist',async(req, res)=>{
    var data
    try{
        data = await database.db("Users").collection("Users").findOne({username: req.session.name})
    }
    catch(error){
        console.log(error)
    }
    for(let i in data.readinglist){
        if(data.readinglist[i].path == req.body.path){
            res.render(req.body.path,{message : "You have already added this book"})
            return
        }
    }
    data.readinglist.push({path:req.body.path,name: req.body.name})
    try{
        await database.db("Users").collection("Users").updateOne({ username: req.session.name }, {$set: {readinglist: data.readinglist} })
    }
    catch(error){
        console.log(error)
    }
    res.render(req.body.path,{message: ""})
})
app.post('/search',function(req, res){
    var x = (req.body.Search).toLocaleLowerCase()
    var list =[]
    var data = [{"path":"flies","name":"Lord of the Flies"},{"path":"grapes","name":"The Grapes of Wrath"},{"path":"leaves","name":"Leaves of Grass"},{"path":"sun","name":"The Sun and Her Flowers"},{"path":"dune","name":"Dune"},{"path":"mockingbird","name":"To Kill a Mockingbird"}]
    for(let i in data){
        if(data[i].name.toLocaleLowerCase().includes(x)){
            list.push(data[i])
        }
    }
    res.render('searchresults',{data: list})
})


const port = process.env.PORT || 8080;

app.listen(port, () => console.log('Server is listening on port ${port}...'));

