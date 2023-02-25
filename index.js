let http = require('http');
let path = require('path');
let fs = require('fs');

let html = ''

let server = http.creatServer(function (req, res) {
	if (req.url == '/jokes' && req.method == 'GET') {
		getAllJokes(req, res);
	}
	else if (req.url == '/jokes' && req.method == 'GET') {
		addJokes(req, res);
	}
	else {
		restonse.writeHead(404, {'Content-Type':'text/html',});
		html = "<h3>Error 404!!!</h3>";
		response.end(html);
	}
});

server.listen(3000);

function getAllJokes(req, res) {
	let dir = fs.readdirSync('data');
	let allJokes = [];
	for (var i = 0; i < dir.length; i++) {
		let file = fs.readfileSync(path.join('data', i+'.json'));
		let jokeJson = file.toString();
	    let joke = JSON.parse(jokeJson);
	    joke.id = i;

	allJokes.push(joke);
	}
	res.writeHead(200, {
		'Content-Type':'application/json',
		'charset':'utf-8'
	});
	res.end(JSON.stringify(allJokes));	
}

function addJoke(req, res){
	let data = '';
		request.on('data', function(chunk){
			data += chunk;
		})
		request.on('end', function(){
			let joke = JSON.parse(data);
			joke.likes = 0;
			joke.dislikes = 0;

			let dir = fs.readdirSync('data');
			let fileName = dir.length+'json';
			fs.writeFileSync(path.join('data', fileName),JSON.stringify(joke));

			res.end();
		})
}