const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2Ftc29uODAyIiwiYSI6ImNrN3R0aTljNTEwZDAzZnF0MjhwdGZqYXAifQ.cFBnTiJTXqmcuyF-kaxLqQ&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to location service', undefined)
        } else if (body.features.length === 0) {
            callback('invalid location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })

        }
    })
}


module.exports = geocode