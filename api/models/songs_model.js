'use strict';

const mongoose = require('mongoose');

const schema_bodySongs = new mongoose.Schema({
    'name': { type: String, required: true, unique: false },
    //referencia del id del artista 
    'artist_name': { type: mongoose.Schema.Types.ObjectId, ref: 'Artits' },
    'length_song': { type: Number, required: true, unique: false },
    //referecia el album
    'album': { type: mongoose.Schema.Types.ObjectId, ref: 'Albums' },
    'song_cover': { type: String, required: false, unique: false },
});

module.exports = mongoose.model('Songs', schema_bodySongs, 'songs');