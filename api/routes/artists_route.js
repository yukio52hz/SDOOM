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
        'age': artist.age,
        'albums': artist.albums
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
    Artists.find((err, list) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se pudo listar nada',
                err
            })
        } else {
            res.json({
                'msj': 'Artistas listados',
                list
            })
        }
    })
});

router.get('/search-artistName', (req, res) => {
    Users.findOne({ name: req.query.name }), ((err, artist) => {
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


module.exports = router;