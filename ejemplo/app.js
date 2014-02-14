var http = require('http'),
	mini = require('../mini'),
	app = mini();

http.createServer(app).listen(3000);

app.get('/', function (req, res) {
	res.send('./ejemplo/index.html')
})