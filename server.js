const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view_engine', 'hbs');

// Use function registers middleware (order matters when registering middleware)
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${req.method} ${res.statusCode} ${req.url} ${now}`;
    
    console.log(log);
    fs.appendFile('server.log', `${log}\n`, (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

/*
 * Un-comment this middleware when the website is being updated
 */
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         message: 'The site is currently under maintenance.'
//     });
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello world</h1>');
    // res.send({
    //     name: 'João',
    //     likes: [
    //         'pizza', 
    //         'burgers', 
    //         'burritos'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the website'
    });
});

app.get('/about', (req, res) => {
    // res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
