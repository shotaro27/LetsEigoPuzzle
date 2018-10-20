var urlParser = require('url'),
	handler = function(req, res) {
		var urlParsed = urlParser.parse(req.url),
			filepath = "";
		console.log(urlParsed);
		
		switch (urlParsed.pathname) {
		case "/enchant.js":
			filepath += "/enchant.js";
			break;
		case "/test.js":
			filepath += "/main.js";
			break;
		case "/favicon.ico":
			filepath += "/favicon.ico";
			break;
		case "/marubatu.png":
			filepath += "/marubatu.png";
			break;
		case "/eigo.png":
			filepath += "/eigo.png";
			break;
		case "/erobo.png":
			filepath += "/erobo.png";
			break;
		case "/button.png":
			filepath += "/button.png";
			break;
		case "/abc.png":
			filepath += "/abc.png";
			break;
		case "/cat.mp3":
			filepath += "/En-us-cat.mp3";
			break;
		case "/dog.mp3":
			filepath += "/En-us-dog.mp3";
			break;
		case "/fish.mp3":
			filepath += "/En-us-fish.mp3";
			break;
		case "/star.mp3":
			filepath += "/En-us-star.mp3";
			break;
		case "/bear.mp3":
			filepath += "/En-us-bear.mp3";
			break;
		case "/bird.mp3":
			filepath += "/En-us-bird.mp3";
			break;
		case "/frog.mp3":
			filepath += "/En-us-frog.mp3";
			break;
		case "/pig.mp3":
			filepath += "/En-us-pig.mp3";
			break;
		case "/ant.mp3":
			filepath += "/En-us-ant.mp3";
			break;
		case "/lion.mp3":
			filepath += "/En-us-lion.mp3";
			break;
		case "/ship.mp3":
			filepath += "/En-us-ship.mp3";
			break;
		case "/fox.mp3":
			filepath += "/En-us-fox.mp3";
			break;
		case "/bus.mp3":
			filepath += "/En-us-bus.mp3";
			break;
		case "/car.mp3":
			filepath += "/En-us-car.mp3";
			break;
		case "/cake.mp3":
			filepath += "/En-us-cake.mp3";
			break;
		case "/desk.mp3":
			filepath += "/En-us-desk.mp3";
			break;
		default:
			filepath += "/index.html";
			break;
		}
		fs.readFile(__dirname + filepath,
			function (err, data) {
				if (err) {
					console.log(err);
					res.writeHead(500);
					return res.end("Error");
				}
				res.writeHead(200);
				res.write(data);
				res.end();
			}
		);
	},
	http = require("http"),
	app = http.createServer(handler),
	fs = require("fs"),
	io = require("socket.io").listen(app);
app.listen(4740);
io.set("log level", 1);
var SerialPort = require('serialport');
var port = new SerialPort('COM11', {
	baudRate: 115200
});
port.on('open', function () {
    console.log('Serial open.');
    io.on('connection', function(socket) {
        socket.on('emit_from_client', function(data) {
			write(data);
		});
		port.on('data', function (data) {
			console.log(data.length);
			console.log("Read: " + data.toString());
			socket.emit('emit_from_server', String.fromCharCode(data[0]));
		});
    });
});

function write(data) {
    console.log('Write: ' + data);
    port.write(new Buffer(data), function(err, results) {
        if(err) {
            console.log('Err: ' + err);
            console.log('Results: ' + results);
        }
	});
}