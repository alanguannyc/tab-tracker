const {
    sequelize,
    Song,
    User,
    Bookmark,
    History
  } = require('../src/models')
  
  // const Promise = require('bluebird')
  const songs = require('./songs.json')
  const users = require('./users.json')
  const bookmarks = require('./bookmarks.json')
  const histories = require('./histories.json')
  
  sequelize.sync({force: true})
    .then(async function () {
        await songs.map(song => {
          Song.create(song)
        })

        await users.map(user => {
          User.create(user)
        })

        await bookmarks.map(bookmark => {
          Bookmark.create(bookmark)
        })

        await histories.map(history => {
          History.create(history)
        })

    })