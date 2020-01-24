const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

let set = []

function createRandomSet() {
    const set = []

    for(let i = 0; i < 8; i++) {
        let num = Math.floor(Math.random() * 4) + 1
        set.push(num)
    }

    return set
}

function gameInit() {
    set = []
    for(let i = 0; i < 25; i++) {
        set.push(createRandomSet())
    }
}

const rooms = []

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})

http.listen(port, () => console.log(`Express server is listening on port ${port}`))

io.on('connection', function(socket) {
    socket.on('fetchRoom', function() {
        socket.emit('sendRooms', rooms)
    })

    socket.on('makeRoom', function(newRoomData) {
        gameInit()

        rooms.push({
            roomName: newRoomData.roomName,
            players: [newRoomData.username],
            status: 'waiting',
            allSet: set
        })

        const roomIndex = rooms.length-1
        const roomNameSlug = newRoomData.roomName.split(' ').join('-')
        const room = io.of(roomNameSlug)

        room.on('connection', function(roomSocket) {
            room.emit('joinInfo', `${rooms[roomIndex].players[0]} has joined this room`)

            roomSocket.on('leaveRoom', function(username) {
                roomSocket.leave(roomNameSlug)
                room.emit('leaveInfo', `${username} has left this room`)
            })


            roomSocket.on('startGame', function() {
                rooms[roomIndex].status = 'playing'
                room.emit('gameStart')
            })

            roomSocket.on('pressingWrongButton', function(username) {
                roomSocket.broadcast.emit('userFail', username)
            })

            roomSocket.on('oneSetFinish', function(username) {
                roomSocket.broadcast.emit('oneSetFinished', username)
            })

            roomSocket.on('allSetFinish', function(username) {
                // gameEnd will signal everyone in the room to show win/lose screen and then move to room
                room.emit('gameEnd')
                
                // delete the room from array using slice
                rooms.splice(roomIndex, 1)

                // delete the namespace
            })
        })
        socket.join(roomNameSlug)
    })

    socket.on('joinRoom', function(joinRoomData) {
        let roomIndex

        for(let i in rooms) {
            if(rooms[i].roomName == joinRoomData.roomName) {
                roomIndex = +i
                break
            }
        }

        if(!rooms[roomIndex].players.includes(joinRoomData.username)) {
            rooms[roomIndex].players.push(joinRoomData.username)

            const roomNameSlug = joinRoomData.roomName.split(' ').join('-')
            socket.join(roomNameSlug)
        }
    })
})