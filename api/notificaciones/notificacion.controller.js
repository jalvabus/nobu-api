var Notificacion = require('./notificacion.model');

exports.getNotificaciones = (req, res) => {
    Notificacion.find((err, notificaciones) => {
        return res.status(200).json(notificaciones);
    })
        .populate({
            path: 'vulcano',
            model: 'Vulcano'
        })
        .populate({
            path: 'usuario',
            model: 'Usuario'
        })
}

exports.CreateNotificacion = (req, res) => {
    console.log(req.body);
    var notificacion = new Notificacion();
    notificacion.visto = false;
    notificacion.usuario = req.body.usuario;
    notificacion.fecha = new Date();
    notificacion.ubicacion.latitud = req.body.latitud;
    notificacion.ubicacion.longitud = req.body.longitud;

    notificacion.save(notificacion => {
        res.status(200).json({
            mensaje: "Nueva Notificacion",
            notificacion: notificacion
        })
    }, err => {
        res.status(500).json({ error: err });
    })
}

exports.NotificacionesPorUsuario = (req, res) => {
    Notificacion.find({ usuario: req.params.id_usuario }, (err, notificaciones) => {
        if (err) return res.status(500).json({
            error: err,
            mensaje: "No hay notificaciones"
        })
        return res.status(200).json(notificaciones);
    })
}