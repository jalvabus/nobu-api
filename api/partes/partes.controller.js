var request = require('request');

exports.verReporte = (req, res) => {
    var data = {
        template: { "shortid": "rkJTnK2ce" },
        //data: datos,
        options: {
            preview: true
        }
    }
    var options = {
        uri: 'http://localhost:5488/api/report',
        method: 'POST',
        json: data
    }
    request(options).pipe(res)
} 