const {sequelize, Song, User}  = require('../src/models')

const songs = require('./songs.json')
const users = require('./users.json')

sequelize.sync()
    .then(
        async function () {
            await (users.map(user => {
                User.create(user)
            }))

            await (songs.map(song => {
                Song.create(song)
            }))
        }

)