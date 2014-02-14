/*
 * Mini ruteador de peticiones
 * Author: Andres Atencio
 */
var	pathsGet = {},
	pathsPost = {},
	url = require('url'),
	fileSystem = require('fs'),
    path = require('path');

exports = module.exports = crearApp;

/**
 * Mini version.
 */
exports.version = '0.0.1';

/**
 * Crea nueva app
 *
 * @return {Function}
 * @api public
 */
function crearApp () {
	
	function app (req, res) {
		handler(req, res)
	}

	app.get = appGet;
	app.post = appPost;
	return app;
}

function appGet (path, cb) {
	pathsGet[path] = cb;
}

function appPost (path, cb) {
	pathsPost[path] = cb;
}

// Manejador gral
function handler (req, res) {
	res.send = send;
	var u = url.parse(req.url).pathname;
	switch (req.method) {
		case 'GET':
			get(u, req, res);
			break;
		case 'POST':
			post(u, req, res);
			break;
		}
}

// Maneja get
function get(u, req, res) {
	console.log('GET ==> ' + u);
	try {
		pathsGet[u](req, res);
	} catch (err) {
		console.log(err)
		res.write('==> ' + u + ' | Error en la peticion.' + '\n')
		res.write(err.toString())
		res.end()
	}
}

// Maneja post
function post(u, req, res) {
	console.log('POST ==> ' + u)
	try {
		pathsPost[u](req, res);
	} catch (err) {
		console.log(err)
		res.write('==> ' + u + ' | Error en la peticion.' + '\n')
		res.write(err.toString())
		res.end()
	}
}

function send(arch) {

	var readStream,
		tipo = arch.split('.'),
		filePath = path.join(__dirname, arch),
		stat = fileSystem.statSync(filePath);
    
    this.writeHead(200, {
        'Content-Type': content(tipo[tipo.length - 1]),
        'Content-Length': stat.size
    });

    readStream = fileSystem.createReadStream(filePath);

    readStream.pipe(this);
    
    function content (tipo) {
		
		if ( tipo == 'html' || tipo == 'HTML' || tipo == 'css' || tipo == 'CSS' ) {
			return 'text/' + tipo.toLowerCase();
		} else if( tipo == 'js' || tipo == 'JS' ) {
			return 'application/x-javascript';
		} else {
			return 'text/plain';
		}

	}
}