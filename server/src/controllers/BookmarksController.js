const {Bookmark} = require ('../models')

module.exports = {
    
    async index (req, res) {
            try {
                const {songId, userId} = req.query
                const bookmark = await Bookmark.findAll({
                    where: {
                        UserId: userId,
                        SongId: songId
                    }
                })
                res.send(bookmark)
            } catch (err) {
                res.status(500).send({
                    error: 'An error has occured.'
                })
            }
    },
    async post (req, res) {
        try {
            const {songId, userId} = req.body
            const bookmark = await Bookmark.findOne({
              where: {
                SongId: songId,
                UserId: userId
            }})
            if (bookmark) {
                return res.status(400).send({
                  error: 'You already have it bookmarked.'
                })
            }
            const newBookmark = await Bookmark.create(req.body)
            res.send(newBookmark)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    },
    async delete (req, res) {
        try {
            const {bookmarkId} = req.body
            console.log(bookmarkId)
            await Bookmark.destroy({
                where: {
                    id: bookmarkId
                }
            })
            res.send('it has been deleted')
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    }
}