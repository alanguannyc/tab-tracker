const {Bookmark, Song, User} = require ('../models')
const _ = require('lodash')
module.exports = {   
    async index (req, res) {
            try {
                const userId = req.user.id
                const {songId} = req.query
                const where = {
                    UserId: userId
                }
                console.log(req.query)
                if (songId) {
                    where.SongId = songId
                }
                const bookmarks = await Bookmark.findAll({
                    where: where,
                    include: [
                        {
                            model: Song
                        }
                    ]
                })
                .map(bookmark => bookmark.toJSON())
                .map(bookmark => _.extend({}, 
                    bookmark,
                    bookmark.Song))
                    console.log(bookmarks)
                res.send(bookmarks)
            } catch (err) {
                res.status(500).send({
                    error: 'An error has occured.'
                })
            }
    },
    async post (req, res) {
        try {
            const UserId = req.user.id
            const {SongId} = req.body
            const bookmark = await Bookmark.findOne({
              where: {
                SongId: SongId,
                UserId: UserId
            }})
            console.log(bookmark)
            if (bookmark) {
                return res.status(400).send({
                  error: 'You already have it bookmarked.'
                })
            }
            const newBookmark = await Bookmark.create(
                {
                    SongId: SongId,
                    UserId: UserId
                })
            console.log(newBookmark)
            res.send(newBookmark)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    },
    async delete (req, res) {
        try {
            const userId = req.user.id
            await Bookmark.destroy({
                where: {
                    id: req.params.bookmarkId,
                    UserId: userId
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