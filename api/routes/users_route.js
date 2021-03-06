'use strict';
const express = require('express');
const Users = require('../models/users_model');
const router = new express.Router();

router.post('/register-user', (req, res) => {

    let user = JSON.parse(req.body.object);

    let new_user = new Users({
        'type': user.type,
        'name': user.name,
        'nickname': user.nickname,
        'birth_date': user.birth_date,
        'gender': user.gender,
        'email': user.email,
        'password': user.password,
        'password_confirmation': user.password_confirmation,
        'profile_picture': user.profile_picture,
    });
    new_user.save((err, usr) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se puede registrar el usuario',
                err
            });
        } else {
            res.json({
                'msj': 'Usuario registrado',
                usr
            });
        }
    });
});

router.get('/list-users', (req, res) => {
    Users.find((err, list) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se pudo listar nada',
                err
            })
        } else {
            res.json({
                'msj': 'Usuarios listados',
                list
            })
        }
    });
});


router.post('/log-in', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    Users.findOne({ email: email }, (err, user) => {
        if (err) {
            res.json({
                msj: 'El correo electrónico o la contraseña no son correctos',
                login: false,
                err
            });
        } else {
            if (user && user.password == password) {
                res.json({
                    _id: user._id,
                    type: user.type,
                    name: user.name,
                    nickname: user.nickname,
                    birth_date: user.birth_date,
                    gender: user.gender,
                    email: user.email,
                    profile_picture: user.profile_picture,
                    login: true
                });
            } else {
                res.json({
                    msj: 'El correo electrónico o la contraseña no son correctos',
                    login: false,
                    err
                });
            }


        }
    });
});

router.put('/add-picUser', (req, res) => {
    let user = JSON.parse(req.body.object);
    Users.updateOne({ _id: user._id }, {
        $set: {
            profile_picture: user.profile_picture,
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
router.get('/search-userName', (req, res) => {
    Users.findOne({ name: req.query.name }), ((err, user) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se encontro el usuario',
                err
            })
        } else {
            if (user) {
                res.json({
                    'msj': 'Estos son los datos del usuario',
                    user
                })
            } else {
                res.json({
                    'msj': 'Usuario no encotrado',
                })
            }

        }
    });
});

router.get('/search-userId', (req, res) => {
    Users.findOne({ _id: req.query._id }), ((err, user) => {
        if (err) {
            res.json({
                'msj': 'Algo salio mal y no se encontro el usuario',
                err
            })
        } else {
            if (user) {
                res.json({
                    'msj': 'Estos son los datos del usuario',
                    user
                })
            } else {
                res.json({
                    'msj': 'Usuario no encotrado',
                })
            }

        }
    });
});

router.put('/modify-user', (req, res) => {
    Users.updateOne({ _id: req.body._id }, {
        $set: {
            type: req.body.type,
            name: req.body.name,
            birth_date: req.body.birth_date
        }
    }, (err, info) => {
        if (err) {
            res.json({
                'msj': 'No se puede modificar el Usuario',
                err
            });
        } else {
            res.json({
                'msj': 'Usuario modificado',
                info
            });
        }
    });
});

module.exports = router;