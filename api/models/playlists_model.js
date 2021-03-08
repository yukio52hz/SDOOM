'use strict';

const mongoose = require('mongoose');

const schema_bodyPlaylists = new mongoose.Schema({
    'name': { type: String, required: true, unique: true },
    'songs': [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Songs'
    }]
});


module.exports = mongoose.model('Playlists', schema_bodyPlaylists, 'playlists');