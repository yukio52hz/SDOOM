'use strict';
const express = require('express');
const Songs = require('../models/songs_model');
const router = new express.Router();

router.post('/register-song', (req, res) => {

    let song = JSON.parse(req.body.object);
    //este if pregunta si el song trae el campo y si no lo almacena vacio
    let new_song;
    if (song.album) {
        new_song = new Songs({
            'name': song.name,
            'artist_name': song.artist_name._id,
            'length_song': song.length_song,
            'album': song.album._id,
            'song_cover': song.song_cover,
        });
    } else {
        new_song = new Songs({
            'name': song.name,
            'artist_name': song.artist_name._id,
            'length_song': song.length_song,
            'album': song.album,
            'song_cover': song.song_cover,
        });
    }


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
//asi se hace un listar sip con subdocumentos
router.get('/list-songs', (req, res) => {
    Songs.find().populate('artist_name').populate('album').exec((err, list) => {
        if (err) {
            res.json({
                msj: 'No se encontro el artista',
                err
            });
        } else {
            res.json({
                list
            });
        }
    });
});

router.get('/search-songName', (req, res) => {
    Songs.findOne({ name: req.query.name }), ((err, song) => {
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
router.put('/modify-song', (req, res) => {
    let mSong = JSON.parse(req.body.object);
    Songs.updateOne({ _id: mSong._id }, {
        $set: {
            name: mSong.name,
            artist_name: mSong.artist_name,
            length_song: mSong.length_song,
            album: mSong.album,
            song_cover: mSong.song_cover
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

module.exports = router;





/*
listar normal sin subdocumetos
router.get('/list-songs', (req, res) => {
    Songs.find((err, list) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se pudo listar nada',
                err
            })
        } else {
            res.json({
                'msj': 'Canciones listadas',
                list
            })
        }
    })
});

router.put('/modify-song', (req, res) => {
    let modifySong = JSON.parse(req.body.object);

    Songs.updateOne({ _id: modifySong._id }, {
        $set: {
            'name': modifySong.name,
            'artist_name': modifySong.artist_name._id,
            'length_song': modifySong.length_song,
            'album': modifySong.album._id,
            'song_cover': modifySong.song_cover,
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







*/