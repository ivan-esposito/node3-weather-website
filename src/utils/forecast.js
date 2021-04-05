const request = require('postman-request')

const forecast = (latitud, longitud, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=595ff1223c7533b1e39d747e193fcdeb&query=${latitud},${longitud}`

    request({url, json: true}, (error, response) => {
        if(error) {
            callback('Cannot connect to server', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const {weather_descriptions, temperature, precip} = response.body.current
            callback(undefined,`${weather_descriptions[0]}. It is currently ${temperature} degrees out. There is a ${precip}% chance of rain. Country: ${response.body.location.country}`)
        }
    })
}


module.exports = forecast