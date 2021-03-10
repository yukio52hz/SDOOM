'use strict';

const express = require('express');
const Albums = require('../models/albums_model');
const router = express.Router();

router.post('/register-album', (req, res) => {
    let album = JSON.parse(req.body.object);
    let new_album = new Albums({
        'name': album.name,
        'release_date': album.release_date,
        'album_cover': album.album_cover,
        'length_album': album.length_album,
    });
    //recorro los datos que vienen de album me meto en su propieda de song_list
    //guardo los id en la lista del album que guardo en la base de datos
    album.songs_list.forEach(song => {
        new_album.songs_list.push(song._id);
    });
    new_album.save((err, albm) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se puede registrar el album',
                err
            });
        } else {
            res.json({
                'msj': 'Albums registrado',
                albm
            });
        }
    });
});
//listar con subdocumentos
router.get('/list-albums', (req, res) => {
    Albums.find().populate('songs_list').exec((err, list) => {
        if (err) {
            res.json({
                msj: 'Las canciones del album no sé pudieron listar',
                err
            });
        } else {
            res.json({
                list
            });
        }
    });
});
router.put('/modify-album', (req, res) => {
    let album = JSON.parse(req.body.object);
    Albums.updateOne({ _id: album._id }, {
        $set: {
            name: album.name,
            release_date: album.release_date,
            album_cover: album.album_cover,
            length_album: album.length_album
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar',
                err
            });
        } else {
            res.json({
                info
            });
        }
    });
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