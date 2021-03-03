'use strict';
const express = require('express');
const Playlists = require('../models/playlists_model');
const router = new express.Router();

router.post('/register-playlist', (req, res) => {
    let playlist = JSON.parse(req.body.object);

    let new_playlist = new Playlists({
        'name': playlist.name
    });
    new_playlist.save((err, playl) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se puede registrar la playlist',
                err
            });
        } else {
            res.json({
                'msj': 'Playlist registrada',
                playl
            });
        }
    });
});

router.get('/list-playlist', (req, res) => {
    Playlists.find((err, list) => {
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

router.get('/search-playlistName', (req, res) => {
    Users.findOne({ name: req.query.name }), ((err, song) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se encontro la playlist',
                err
            })
        } else {
            if (song) {
                res.json({
                    'msj': 'Estos son los datos de la playlist',
                    song
                })
            } else {
                res.json({
                    'msj': 'Playlist no encotrado',
                })
            }

        }
    });
});

module.exports = router;