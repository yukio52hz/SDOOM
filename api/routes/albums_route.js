'use strict';

const express = require('express');
const Albums = require('../models/albums_model');
const router = new express.Router();

router.post('/register-album', (req, res) => {

    let album = JSON.parse(req.body.object);

    let new_album = new Albums({
        'code': album.code,
        'name': album.name,
        'realese_date': album.realese_date,
        'length_album': album.length_album,
        'songs_list': album.songs_list

    });
    new_album.save((err, albm) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se puede registrar el album',
                err
            });
        } else {
            res.json({
                'msj': 'Album registrado',
                albm
            });
        }
    });

});

router.get('/list-albums', (req, res) => {
    Albums.find((err, list) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se pudo listar nada',
                err
            })
        } else {
            res.json({
                'msj': 'Albums listados',
                list
            })
        }
    })
});

router.get('/search-albumName', (req, res) => {
    Users.findOne({ name: req.query.name }), ((err, album) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se encontro el album',
                err
            })
        } else {
            if (album) {
                res.json({
                    'msj': 'Estos son los datos del album',
                    album
                })
            } else {
                res.json({
                    'msj': 'Album no encotrado',
                })
            }

        }
    });
});


module.exports = router;