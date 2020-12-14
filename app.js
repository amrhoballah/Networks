const express = require('express') 
const path = require('path') 
const fs = require('fs')
const app = express() 


app.use(express.urlencoded());


app.use(express.json());

  
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 


app.get('/', function(req, res){ 

    res.render('login') 
}) 
app.get('/login', function(req, res){ 

    res.render('login') 
}) 
app.get('/registration', function(req, res){ 

    res.render('registration') 
})
app.get('/errorregister', function(req, res){ 

    res.render('errorregister') 
})
app.get('/confirmregister', function(req, res){ 

    res.render('confirmregister') 
})

app.post('/register', function(request, res){
    console.log(request.body.username)
    console.log(request.body.password)
    var user = {username: request.body.username, password: request.body.password}
    var data = JSON.parse(fs.readFileSync("users.json"))
    for( i in data){
        if (user.username == data[i].username){
            res.render('errorregister')
            return;
        }
    }
    data.push(user)
    fs.writeFileSync('users.json', JSON.stringify(data))
    res.render('confirmregister')
    
})
app.post('/login',function(request, res){
    var user = {username: request.body.username, password: request.body.password}
    var data = JSON.parse(fs.readFileSync("users.json"))
    for( i in data){
        if (user.username == data[i].username && user.password == data[i].password){
            res.render('home')
            return;
        }
    }
    res.render('login')
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

    res.render('readlist') 
}) 
app.get('/searchresults', function(req, res){ 

    res.render('searchresults') 
}) 
app.get('/sun', function(req, res){ 

    res.render('sun') 
}) 

app.listen(8080, function(error){ 
    if(error) throw error 
    console.log("Local Host 8080 is waiting for you") 
}) 