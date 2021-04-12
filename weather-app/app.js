const geocode = require('./utils/geocode')

geocode('Bogota', (error, data) => {
    console.log('Error', error)
    console.log('data', data)
})