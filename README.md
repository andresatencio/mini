##Mini
>Mini es un ruteador de peticiones sencillo y fue creado con el fin de practicar un poco nodejs.

### Uso:

```
var http = require('http'),
    mini = require('./mini'),
	app = mini();

http.createServer(app).listen(3000);

app.get('/', function (req, res) {
	res.send('index.html')
})
```
[Andres Atencio](http://www.andresatencio.com.ar)