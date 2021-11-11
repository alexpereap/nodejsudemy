const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage } = require('./utils/messages')
const { generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

// socket.emit => Envia solo al usuario actual
// io.emmit => envia a todos
// socket.broadcast.emit => envia a todos excepto el usuario actual

// rooms
// io.to(room).emit => Envia a todos en el room 
// socket.broadcast.to(room).emit => Envia a todos en el room excepto el usuario actual

io.on('connection', (socket) => {
    console.log('new websocket connecion')

    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage(user.username, 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage(null, `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        user = getUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage(user.username, message))
            return callback('Delivered')
        }

        return callback('User not found')
    })

    socket.on('sendLocation', (position, callback) => {
        user = getUser(socket.id)
        if (user) {
            io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, position))
            return callback()
        }

       return callback('user not found')
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage(user.username, `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on ${port}!`)
})