const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars egine and views location (hbs)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Matheus Mol'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Matheus Mol'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Matheus Mol'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })

        })
    })


    // res.send([{
    //     forecast: req.query.forecast,
    //     location: req.query.location,
    //     address: req.query.address
    // }])
})

app.get('/products', (req, res) => {
    if (!req.query.search) return res.send({
        error: 'You must provide a search term'
    })

    res.send({
        products: []
    })

})

app.get('*', (req, res) => { //matchs everthing isnt in the website
    res.render('404')
})


app.listen(2021, () => {
    console.log('server is up')
    console.log('http://localhost:2021')
})