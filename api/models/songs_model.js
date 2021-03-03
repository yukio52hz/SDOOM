'use strict';

const mongoose = require('mongoose');

const schema_bodySongs = new mongoose.Schema({
    'name': { type: String, required: true, unique: false },
    'artist_name': { type: String, required: true, unique: false },
    'length_song': { type: String, required: true, unique: false },
    'album': { type: String, required: false, unique: false },
});

module.exports = mongoose.model('Songs', schema_bodySongs, 'songs');