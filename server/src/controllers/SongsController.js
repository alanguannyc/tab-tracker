const {Song} = require ('../models')

module.exports = {
    
    async index (req, res) {
        try {
            const songs = await Song.findAll({
                limit: 10
            })
            res.send(songs)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    },
    async post (req, res) {
        try {
            const song = await Song.create(req.body)
            res.send(song)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    },
    async show (req, res) {
        try {
            const song = await Song.findOne({
                where: {
                    id: req.params.id
                }
            })
            res.send(song)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    },
    async put (req, res) {
        try {
            const song = await Song.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    },
    async delete (req, res) {
        try {
            await Song.destroy({
                where: {
                    id: req.params.id
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