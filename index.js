const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

// heroku port
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.use((req,res, next) => {

    var now = new Date().toString();

    var log = `${now}: ${req.method}`;

    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log(`unable to append to server.log`)
        }
    });
    next();

});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();

});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('Hello Express');

    // res.send({
    //     name: "Atuma",
    //     likes: [
    //         'Code',
    //
    res.render('home.hbs', {
        pageTitle: "Home Page",
        welcomeMessage: 'Welcome to my website'
    })
});

app.get('/about', (req, res) => {
    // res.send('About page');
    res.render('about.hbs', {
        pageTitle: "About Page"
    })
});

app.get('/bad', (req, res) => {

    res.send({
        errorMessage: 'Error loading page',
        status: 300
    })
});

//takes an optional 2nd argument
app.listen(port, () => {
    console.log(`Server is up in port ${port}`);
});