const fs = require('fs')

// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan holiday'
// }

// const bookJson = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJson)

// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJson = dataBuffer.toString()
// const data = JSON.parse(dataJson)
// console.log(data.title)

const dataBuffer = fs.readFileSync('1-json.json')
let dataJson = dataBuffer.toString()
let data = JSON.parse(dataJson)
data.name = 'Alex'
data.age = 31
dataJson = JSON.stringify(data)
fs.writeFileSync('1-json.json', dataJson)