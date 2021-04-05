const request = require('postman-request')

const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiaXZhbi1lc3Bvc2l0byIsImEiOiJja21mMTh1N3YwNGVvMnZrMThtbXFzYjg5In0.7jG1AoFOvB0o-jkbB9PHVg&limit=1`

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const {center, place_name} = response.body.features[0]
            callback(undefined, {
                longitud: center[0],
                latitud: center[1],
                location: place_name
            })
        }
    })
}

module.exports = geocode