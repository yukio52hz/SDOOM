'use strict';
const express = require('express');
const Artists = require('../models/artists_model');
const router = new express.Router();

router.post('/register-artist', (req, res) => {
    let artist = JSON.parse(req.body.object);
    let new_artist = new Artists({
        'name': artist.name,
        'record_house': artist.record_house,
        'birth_date': artist.birth_date,
        'profile_picture': artist.profile_picture,
        'age': artist.age,
        'albums': artist.albums,

    });
    new_artist.save((err, arts) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se puede registrar el artista',
                err
            });
        } else {
            res.json({
                'msj': 'Artista registrado',
                arts
            });
        }
    });
});

router.get('/list-artists', (req, res) => {
    Artists.find().populate('albums').exec((err, list) => {
        if (err) {
            res.json({
                msj: 'Artistas listado',
                err
            });
        } else {
            res.json({
                list
            });
        }
    });
});

router.get('/search-artistName', (req, res) => {
    Artists.findOne({ name: req.query.name }), ((err, artist) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se encontro el artista',
                err
            })
        } else {
            if (artist) {
                res.json({
                    'msj': 'Estos son los datos del artista',
                    artist
                })
            } else {
                res.json({
                    'msj': 'Artista no encotrado',
                })
            }

        }
    });
});
router.put('/add-albumsArtist', (req, res) => {
    let art = JSON.parse(req.body.object);
    Artists.updateOne({ _id: art._id }, {
        $set: {
            albums: art.albums

        }
    }, (err, info) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo agregar el album',
                err
            });
        } else {
            res.json({
                resultado: true,
                info
            });
        }
    });
});
router.put('/modify-artist', (req, res) => {
    let art = JSON.parse(req.body.object);
    Artists.updateOne({ _id: art._id }, {
        $set: {
            name: art.name,
            record_house: art.record_house,
            birth_date: art.birth_date,
            profile_picture: art.profile_picture,
            age: art.age,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo modificar el ejercicio',
                err
            });
        } else {
            res.json({
                resultado: true,
                info
            });
        }
    });

});

module.exports = router;