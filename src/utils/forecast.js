const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/27ab22fbf91322039506d7a9df8cc3b3/' + latitude + ', ' + longitude + ''

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather services', undefined)
        } else if (body.error) {
            callback("can't connect to weather location", undefined)
        } else {
    
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The temperature high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + ' chance of rain')
        }
    })
}


module.exports = forecast