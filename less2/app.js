//*****************************************************************************************************
//* ======================================== Все повиправляв ======================================== *
//*****************************************************************************************************
const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const app = express();
const filePath = path.join(__dirname, 'data', 'user.json');
app.listen(4100, () => {
    console.log('Діло буде');
    console.log('Port: 4100');
});


app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
        defaultLayout: false
    }
));
app.set('views', path.join(__dirname, 'views'));

//========================== Single user and Users
app.get('/user', (req, res) => {
    fs.readFile(filePath, (err, data) => {

        if(err) {
            res.render('error',
                {
                    error: 'Something is wrong with user.json',
                    link: 'login',
                    linkText: 'Try again'
                });
        }

      let user = JSON.parse(data.toString());
    res.render('user',{user});
   });
});

app.get('/allUsers', (req, res) => {
    fs.readFile(filePath, (err, data) => {

        if (err) {
            res.render('error',
                {
                    error: 'Something is wrong with user.json',
                    link: 'login',
                    linkText: 'Try again'
                });
        }

      let users = JSON.parse(data.toString());
    res.render('allUsers',{users});
   });
});

app.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    fs.readFile(filePath, (err, data) => {

        if (err) {
            res.render('error',
                {
                    error: 'Something is wrong with user.json',
                    link: 'login',
                    linkText: 'Try again'
                });
        }

        const users = JSON.parse(data.toString());
        res.render('user',{oneUser:users[userId]})
    });
});
//==========================

//========================== default page
app.get('/', (req, res) => {
    res.render('login');
});
// ========================= error page
app.get('/error', (req, res) => {
    res.render('error');
});

//========================== login get&post
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    fs.readFile(filePath, (err, data) => {

        if (err) {
            res.render('error',
                {
                    error: 'Something is wrong with user.json',
                    link: 'login',
                    linkText: 'Try again'
                });

        }

        let users = JSON.parse(data.toString());

        if (users.some(user => user.email === req.body.email) && users.some(user => user.password === req.body.password) ) {
            let userIdx = users.findIndex(user => user.email === req.body.email);
            res.redirect(`user/${userIdx}`);
            return;
        }

        res.render('error',
            {
                error: ' Cant find user',
                link: '/register',
                linkText: 'register'
            });
    });
});

//========================== register get&post
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    fs.readFile(filePath, (err, data) => {

        if (err) {
            res.render('error', {error: 'Something is wrong with user.json'});
        }

        let users = JSON.parse(data.toString());

        if (users.some(user => user.email === req.body.email)) {
            res.render('error',
                {
                    error: 'User has been registered',
                    link: '/login',
                    linkText: 'login'
                });
            return;
        }

        users.push(req.body);
        fs.writeFile(filePath, JSON.stringify(users), err1 => {

            if (err1) {
                res.render('error',
                    {
                        error: 'Something is wrong with user.json',
                        link: 'login',
                        linkText: 'Try again'
                    });
            }

            res.redirect('allUsers');
        });
    });
});




