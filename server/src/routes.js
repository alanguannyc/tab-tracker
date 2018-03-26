const AuthenticationController = require('./controllers/AuthenticationController')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoryController = require('./controllers/HistoryController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/login', AuthenticationController.login)

    app.get('/songs', SongsController.index)
    app.post('/songs', SongsController.post)
    app.get('/songs/:id', SongsController.show)
    app.put('/songs/:id', SongsController.put)
    app.delete('/songs/:id', SongsController.delete)

    app.get('/bookmarks', isAuthenticated, BookmarksController.index)
    app.post('/bookmarks', isAuthenticated, BookmarksController.post)
    app.delete('/bookmarks/:bookmarkId', isAuthenticated, BookmarksController.delete)

    app.get('/histories', HistoryController.index)
    app.post('/histories', HistoryController.post)
}
