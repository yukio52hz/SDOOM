'use strict';
const express = require('express');
const Songs = require('../models/songs_model');
const router = new express.Router();

router.post('/register-song', (req, res) => {

    let song = JSON.parse(req.body.object);

    let new_song = new Songs({
        'name': song.name,
        'artist_name': song.artist_name,
        'length_song': song.length_song,
    });
    new_song.save((err, sng) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se puede registrar la canción',
                err
            });
        } else {
            res.json({
                'msj': 'Canción registrada',
                sng
            });
        }
    });
});

router.get('/list-songs', (req, res) => {
    Songs.find((err, list) => {
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

router.get('/search-songName', (req, res) => {
    Users.findOne({ name: req.query.name }), ((err, song) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se encontro el canción',
                err
            })
        } else {
            if (song) {
                res.json({
                    'msj': 'Estos son los datos del canción',
                    song
                })
            } else {
                res.json({
                    'msj': 'Canción no encotrado',
                })
            }

        }
    });
});

module.exports = router;