const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const http = require('http')
const server = http.createServer(app)
//const { Server } = require('socket.io')
//const io = new Server(server)
const forecast = require ('../src/utilits/forecast')
const geocode = require ('../src/utilits/geocode')

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'BlackBox Cyberdev'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'BlackBox Cyberdev'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'BlackBox Cyberdev'
    })
})

app.get('/weather',(req, res) =>{
    const address = req.query.address
    if(!req.query.address){
    return res.send ({
           error: 'You must provide a valid address'
        })
    }

    geocode(address, (error, {latitude, longetude, detail} = {}) =>{
        if (error){
            return console.log(error)
        }

        forecast(latitude,longetude, (errorWeather, dataWeather) => {
        
            if(error) {
                return console.log(error)
            }
             res.send({
                error: errorWeather,
                forecast: dataWeather,
                location: detail
            })
        })
    })
    

 

  

    /*res.send({
        location: req.query.address,
        forecast: 'muito nubelado',
    })*/
})

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

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'BlackBox Cyberdev',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'BlackBox Cyberdev',
        errorMessage: 'Page not found.'
    })
})

server.listen(port, () => {
    console.log('Server is up on port:' + port)
})