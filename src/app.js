const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Iván Espósito'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Iván Espósito'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Iván Espósito',
        message: 'Estudio Ingeniería Industrial'
    })
} )

//app.com/weather

app.get('/weather', (req, res) => {

    if (!req.query.adress) {
        return res.send({
            error: 'No adress detected'
        })
    } else {
        geocode(req.query.adress, (error, data) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            const {latitud, longitud, location} = data

            forecast(latitud, longitud, (error, forecastData) => {
                if (error) {
                    res.send({
                        error: error
                    })
                }
                res.send(
                     {
                        forecast: forecastData,
                        location,
                        latitud,
                        longitud
                    }
                )
            })
        })
    }
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
   console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404notfound', {
        message: 'Help article not found',
        name: 'Iván Espósito',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404notfound', {
        meesage: 'Page not found',
        name: 'Iván Espósito',
        title: '404'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})