var urlParser = require('url'),
	handler = function(req, res) {
		var urlParsed = urlParser.parse(req.url),
			filepath = "";
		console.log(urlParsed.pathname);
		
		switch (urlParsed.pathname) {
		case "/enchant.js":
			filepath += "/enchant.js";
			break;
		case "/test.js":
			filepath += "/mainC5.js";
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
		case "/down.png":
			filepath += "/down.png";
			break;
		case "/sea.png":
			filepath += "/sea.png";
			break;
		case "/seaisland.png":
			filepath += "/seaisland.png";
			break;
		case "/searobo.png":
			filepath += "/searobo.png";
			break;
		case "/seastage.png":
			filepath += "/seastage.png";
			break;
		case "/selectmode.png":
			filepath += "/selectmode.png";
			break;
		case "/mode.png":
			filepath += "/mode.png";
			break;
		case "/boat.png":
			filepath += "/boat.png";
			break;
		case "/boat2.png":
			filepath += "/boat2.png";
			break;
		case "/fukidashi1.png":
			filepath += "/fukidashi1.png";
			break;
		case "/fukidashi2.png":
			filepath += "/fukidashi2.png";
			break;
		case "/gamestart.png":
			filepath += "/gamestart.png";
			break;
		case "/gamestart2.png":
			filepath += "/gamestart2.png";
			break;
		case "/game.png":
			filepath += "/game.png";
			break;
		case "/gameclear.png":
			filepath += "/gameclear.png";
			break;
		case "/start.png":
			filepath += "/start.png";
			break;
		case "/startbubble.png":
			filepath += "/startbubble.png";
			break;
		case "/startfish.png":
			filepath += "/startfish.png";
			break;
		case "/startyacht.png":
			filepath += "/startyacht.png";
			break;
		case "/lets.png":
			filepath += "/lets.png";
			break;
		case "/letseigo.png":
			filepath += "/letseigo.png";
			break;
		case "/letspuzzle.png":
			filepath += "/letspuzzle.png";
			break;
		case "/icon.png":
			filepath += "/icon.png";
			break;
		case "/setbutton.png":
			filepath += "/setbutton.png";
			break;
		case "/exp1.png":
			filepath += "/exp1.png";
			break;
		case "/exp2.png":
			filepath += "/exp2.png";
			break;
		case "/exp3.png":
			filepath += "/exp3.png";
			break;
		case "/exp4.png":
			filepath += "/exp4.png";
			break;
		case "/expapple.png":
			filepath += "/expapple.png";
			break;
		case "/applet.png":
			filepath += "/applet.png";
			break;
		case "/item.png":
			filepath += "/item.png";
			break;
		case "/res1.png":
			filepath += "/res1.png";
			break;
		case "/complete.png":
			filepath += "/complete.png";
			break;
		case "/load.png":
			filepath += "/load.png";
			break;
		case "/loadrobo.png":
			filepath += "/loadrobo.png";
			break;
		case "/loadsea.png":
			filepath += "/loadsea.png";
			break;
		case "/loadingrobo.png":
			filepath += "/loadingrobo.png";
			break;
		case "/loadisland.png":
			filepath += "/loadisland.png";
			break;
		case "/loadships.png":
			filepath += "/loadships.png";
			break;
		case "/loadsky.png":
			filepath += "/loadsky.png";
			break;
		case "/selectsea.png":
			filepath += "/selectsea.png";
			break;
		case "/selectsky.png":
			filepath += "/selectsky.png";
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
		case "/orange.mp3":
			filepath += "/orange.mp3";
			break;
		case "/peach.mp3":
			filepath += "/En-us-peach.mp3";
			break;
		case "/bread.mp3":
			filepath += "/En-us-bread.mp3";
			break;
		case "/horse.mp3":
			filepath += "/En-us-horse.mp3";
			break;
		case "/pencil.mp3":
			filepath += "/En-us-pencil.mp3";
			break;
		case "/flower.mp3":
			filepath += "/En-us-flower.mp3";
			break;
		case "/train.mp3":
			filepath += "/En-us-train.mp3";
			break;
		case "/castle.mp3":
			filepath += "/En-us-castle.mp3";
			break;
		case "/apple.mp3":
			filepath += "/En-us-apple.mp3";
			break;
		case "/carrot.mp3":
			filepath += "/En-us-carrot.mp3";
			break;
		case "/rabbit.mp3":
			filepath += "/En-us-rabbit.mp3";
			break;
		case "/book.mp3":
			filepath += "/En-us-book.mp3";
			break;
		case "/corn.mp3":
			filepath += "/En-us-corn.mp3";
			break;
		case "/tomato.mp3":
			filepath += "/En-us-tomato.mp3";
			break;
		case "/melon.mp3":
			filepath += "/melon.mp3";
			break;
		case "/egg.mp3":
			filepath += "/En-us-egg.mp3";
			break;
		case "/island.mp3":
			filepath += "/En-us-island.mp3";
			break;
		case "/sea.mp3":
			filepath += "/En-us-sea.mp3";
			break;
		case "/sun.mp3":
			filepath += "/En-us-sun.mp3";
			break;
		case "/lemon.mp3":
			filepath += "/lemon.mp3";
			break;
		case "/milk.mp3":
			filepath += "/milk.mp3";
			break;
		case "/meat.mp3":
			filepath += "/En-us-meat.mp3";
			break;
		case "/sheep.mp3":
			filepath += "/En-us-sheep.mp3";
			break;
		case "/house.mp3":
			filepath += "/En-us-house-noun.mp3";
			break;
		case "/shoes.mp3":
			filepath += "/En-us-shoes.mp3";
			break;
		case "/violin.mp3":
			filepath += "/En-us-violin.mp3";
			break;
		case "/cow.mp3":
			filepath += "/En-us-cow.mp3";
			break;
		case "/banana.mp3":
			filepath += "/En-us-banana.mp3";
			break;
		case "/onion.mp3":
			filepath += "/En-us-onion.mp3";
			break;
		case "/potato.mp3":
			filepath += "/En-us-potato.mp3";
			break;
		case "/kobitonokitchen.mp3":
			filepath += "/kobitonokitchen.mp3";
			break;
		case "/kurukuru.mp3":
			filepath += "/kurukuru.mp3";
			break;
		case "/tanosimi.mp3":
			filepath += "/tanosimi.mp3";
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