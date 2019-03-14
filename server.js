var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var morgan = require('morgan');

const http = require('http');
var app = express();

app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

var CONFIG = require('./config');

var mongoose = require('mongoose');
mongoose.connect(CONFIG.DATABASE.URL, (err, connect) => {
    if (err) throw err;
    console.log("Conexion establecida a la base de datos.")
});

app.get('/', (req, res) => {
    res.status(200).json({
        mensajeAPI: "API WORKS"
    })
});

var jwt = require('jsonwebtoken')
const secret = 'nobu2018'

app.get('/token/:token', (req, res) => {

    jwt.verify(req.params.token, secret, function (err, decoded) {
        if (err) return res.json(err);

        Vulcano.findById(decoded)
            .then(usuario => usuario ? res.json(usuario) : res.json(false))
            .catch(err => res.json(err))
    });
})


app.use('/api', require('./api/api'));
app.use('/', require('./api/'));


var Vulcano = require('./api/vulcano/vulcano.model');
var bcrypt = require('bcryptjs');

app.get('/reg', (req, res) => {
    var usuario = new Vulcano({
        clave: "123",
        numero_empleado: "123",
        usuario: "vulcano",
        nombre: "juan",
        apellido_paterno: "alva",
        apellido_materno: "bustamante",
        estado: "activo",
        estacion: "5c51e65eee3c6c274c1df171",
        guardia: "5c4b62702422022980ebc237",
        grado: "5c4b570a6e383304e8aae662",
        rol: "vulcano"
    });

    bcrypt.genSaltAsync(10)
        .then((salt) => {
            return bcrypt.hashAsync('nobu123', salt);
        }).then(function (password) {
            usuario.password = password
            return usuario.save()
        })
        .then((usuario) => {
            console.log(usuario);
            res.json(usuario);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})

app.get('/regAdmin', (req, res) => {
    var usuario = new Vulcano({
        clave: "123",
        numero_empleado: "123",
        usuario: "admin",
        nombre: "eduardo",
        apellido_paterno: "valencia",
        apellido_materno: "zavala",
        estado: "activo",
        estacion: "5c51e65eee3c6c274c1df171",
        guardia: "5c4b62702422022980ebc237",
        grado: "5c4b570a6e383304e8aae662",
        rol: "administrador"
    });

    bcrypt.genSaltAsync(10)
        .then((salt) => {
            return bcrypt.hashAsync('nobu123', salt);
        }).then(function (password) {
            usuario.password = password
            return usuario.save()
        })
        .then((usuario) => {
            console.log(usuario);
            res.json(usuario);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})

app.get('/regAdminModulo', (req, res) => {
    var usuario = new Vulcano({
        clave: "123",
        numero_empleado: "123",
        usuario: "adminModulo",
        nombre: "alejandro",
        apellido_paterno: "palizada",
        apellido_materno: "sanchez",
        estado: "activo",
        estacion: "5c51e65eee3c6c274c1df171",
        guardia: "5c4b62702422022980ebc237",
        grado: "5c4b570a6e383304e8aae662",
        rol: "administradorModulo"
    });

    bcrypt.genSaltAsync(10)
        .then((salt) => {
            return bcrypt.hashAsync('nobu123', salt);
        }).then(function (password) {
            usuario.password = password
            return usuario.save()
        })
        .then((usuario) => {
            console.log(usuario);
            res.json(usuario);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})

app.use('*', (req, res) => {
    res.status(400).json({
        error: "NOT FOUND"
    })
})
/*
app.listen(CONFIG.PORT, () => {
    console.log("Nobu api working on http://localhost:" + CONFIG.PORT);
})
*/

const server = http.Server(app);
server.listen(CONFIG.PORT, function () {
    console.log('Nobi API REST listening in http://localhost:' + CONFIG.PORT);
});