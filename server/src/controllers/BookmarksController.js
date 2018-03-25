const {Bookmark, Song, User} = require ('../models')
const _ = require('lodash')
module.exports = {
    
    async index (req, res) {
            try {
                const {songId, userId} = req.query
                const where = {
                    UserId: userId
                }
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
                    bookmark.Song,
                    bookmark))
                res.send(bookmarks)
            } catch (err) {
                res.status(500).send({
                    error: 'An error has occured.'
                })
            }
    },
    async post (req, res) {
        try {
            const {SongId, UserId} = req.body
            const bookmark = await Bookmark.findOne({
              where: {
                SongId: SongId,
                UserId: UserId
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
            await Bookmark.destroy({
                where: {
                    id: req.params.bookmarkId,
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