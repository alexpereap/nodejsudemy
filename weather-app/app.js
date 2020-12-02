const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=496289b6fa3157a9ef8bc04f1623b7ea&query=bogota'

request({ url: url, json: true }, (error, response) => {
    const data = response.body
    console.log(`It is currently ${data.current.temperature} degrees out. humidiy: ${data.current.humidity}`)
})