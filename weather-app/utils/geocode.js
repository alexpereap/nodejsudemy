const request = require('request')

const geocode = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=496289b6fa3157a9ef8bc04f1623b7ea&query=${encodeURIComponent(address)}`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if(response.body.success === false) {
            callback(`Unable to find to location try another search. ${response.body.error.info}`, undefined)
        } else {
            callback(undefined, {
                latitude: response.body.location.lat,
                longitude: response.body.location.lon,
                location: `${response.body.location.name}, ${response.body.location.country}`
            })
        }
    })
}

module.exports = geocode