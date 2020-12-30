const express = require('express') 
const path = require('path') 
const fs = require('fs')
const { findSourceMap } = require('module')
const session = require('express-session')
const app = express()
app.use(session({secret: 'ssshhhhh'}));
var currentUser;
app.use(express.urlencoded());
app.use(express.static('public'))
app.use(express.json());

  
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 


app.get('/', function(req, res){ 

    res.render('login',{message : ""}) 
}) 
app.get('/registration', function(req, res){ 

    res.render('registration', {message: ""}) 
})
app.get('/dune', function(req, res){ 

    res.render('dune') 
}) 
app.get('/fiction', function(req, res){ 

    res.render('fiction') 
})
app.get('/flies', function(req, res){

    res.render('flies') 
}) 
app.get('/grapes', function(req, res){ 

    res.render('grapes') 
}) 
app.get('/home', function(req, res){ 

    res.render('home') 
}) 
app.get('/leaves', function(req, res){ 

    res.render('leaves') 
}) 
app.get('/mockingbird', function(req, res){ 

    res.render('mockingbird') 
}) 
app.get('/novel', function(req, res){ 

    res.render('novel') 
}) 
app.get('/poetry', function(req, res){ 

    res.render('poetry') 
}) 
app.get('/readlist', function(req, res){ 
    var data = JSON.parse(fs.readFileSync("users.json"))
    var list
    for( i in data){
        if (currentUser == data[i].username)
            list = data[i].readinglist
    }
    res.render('readlist',{data: list }) 
}) 
app.get('/searchresults', function(req, res){ 

    res.render('searchresults',{data:[]}) 
}) 
app.get('/sun', function(req, res){ 

    res.render('sun') 
})

app.post('/register', function(request, res){
    var user = {username: request.body.username, password: request.body.password, readinglist: []}
    var data = JSON.parse(fs.readFileSync("users.json"))
    for( i in data){
        if (user.username == data[i].username){
            res.render('registration',{message : "This username is already taken"})
            return;
        }
        if (user.username == "" || user.password == ""){
            res.render('registration',{message : "Please enter a username and a password"})
            return;
        }
    }
    data.push(user)
    fs.writeFileSync('users.json', JSON.stringify(data,null,2))
    res.render('login',{message : "You have registered successfully"})
    
})
app.post('/login',function(request, res){
    var user = {username: request.body.username, password: request.body.password}
    var data = JSON.parse(fs.readFileSync("users.json"))
    for( i in data){
        if (user.username == data[i].username && user.password == data[i].password){
            currentUser = req.session
            currentUser.username = user.username
            res.render('home')
            return
        }
    }
    res.render('login',{message : "The username or password are incorrect"})
})
app.post('/addtoreadinglist',function(request, res){
    var data = JSON.parse(fs.readFileSync("users.json"))
    for( i in data){
        if (currentUser.session = request.session && currentUser.username == data[i].username){
            for(j in data[i].readinglist)
                if(data[i].readinglist[j].path == request.body.path){
                    res.render(request.body.path)
                    return
                }
            data[i].readinglist.push({path:request.body.path,name: request.body.name})
        }
    }
    fs.writeFileSync('users.json', JSON.stringify(data))
    res.render(request.body.path)
})
app.post('/search',function(req, res){
    var x = (req.body.Search).toLocaleLowerCase()
    var list =[]
    var data = [{"path":"flies","name":"Lord of the Flies"},{"path":"grapes","name":"The Grapes of Wrath"},{"path":"leaves","name":"Leaves of Grass"},{"path":"sun","name":"The Sun and Her Flowers"},{"path":"dune","name":"Dune"},{"path":"mockingbird","name":"To Kill a Mockingbird"}]
    for(i in data){
        if(data[i].name.toLocaleLowerCase().includes(x)){
            list.push(data[i])
        }
    }
    res.render('searchresults',{data: list})
})


const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));

