const {History, Song, User} = require ('../models')
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
                const histories = await History.findAll({
                    where: where,
                    include: [
                        {
                            model: Song
                        }
                    ]
                })
                .map(history => history.toJSON())
                .map(history => _.extend({}, 
                    history.Song,
                    history))
                res.send(_.uniqBy(histories, history => history.SongId))
            } catch (err) {
                res.status(500).send({
                    error: 'An error has occured.'
                })
            }
    },
    async post (req, res) {
        try {
            const {SongId, UserId} = req.body
            const history = await History.create(req.body)
            res.send(history)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    }
}