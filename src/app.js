const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Andrew Mead',
        title: 'About me'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        context: 'lorem25',
        name: 'Andrea Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a nadress'
        })
    }

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longtitude, (error, forecasData) => {
            if (error) {
                return console.log(error)
            }

            res.send({
                forecast: forecasData,
                location: location,
                address: req.query.address
            })

        })    
    })


})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error - 404',
        name: 'Andrew Mead',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error - 404',
        name: 'Andrew Mead',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server Up')
})