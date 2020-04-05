const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templetes/views')
const partialsPath = path.join(__dirname, '../templetes/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))


//index page
app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Samson Ugwu'
    })
})

//about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Samson Ugwu'
    })
})


//help page
app.get('/help', (req, res) => {
    res.render('help', {
        someText: 'This is the help page',
        title: 'Help',
        name: 'Samson Ugwu'
    })
})



//weather app
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
    forecast(latitude, longitude, (error, forecastData) =>{
        if (error) {
            return res.send({error})
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
    })
})



//product page
app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


//404 for help page 
app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Samson Ugwu',
        text: 'Help article not found'
    })
})


//404 page 
app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Samson Ugwu',
        text: 'page not found'
    })
})




app.listen(port, () =>{
    console.log('Server is up on port' + port)
})