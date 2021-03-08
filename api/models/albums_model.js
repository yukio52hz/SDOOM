'use strict';

const mongoose = require("mongoose");

const schema_bodyAlbums = new mongoose.Schema({
    'name': { type: String, required: true, unique: false },
    'release_date': { type: Date, required: true, unique: false },
    'album_cover': { type: String, required: false, unique: false },
    'length_album': { type: Number, required: false, unique: false },
    //subducumentos,guardo el id de la cancion me funciona como una llave foranea,referecia
    //[] por que recive un arreglo y si es solo uno el que resive sin los []
    'songs_list': [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Songs'
    }],
});

module.exports = mongoose.model('Albums', schema_bodyAlbums, 'albums');