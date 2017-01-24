6:

var fs = require('fs')
var path = require('path')
 
var dir = process.argv[2]
var filterStr = process.argv[3]
 
function getFiles(dir, filterStr, callback) {
 
  fs.readdir(dir, function (err, list) {
    if (err)
      return callback(err)
 
    list = list.filter(function (file) {
      return path.extname(file) === '.' + filterStr
    })
 
    callback(null, list)
  })
}
 
getFiles(dir, filterStr, function (err, list) {
  if (err)
    return console.error('There was an error:', err)
 
  list.forEach(function (file) {
    console.log(file)
  })
})

mymodule.js
var fs = require('fs');
var path = require('path');
module.exports = function(dir, ext, callback){
        fs.readdir(dir, function(err, list){
                if(err)
                        return callback(err);
                list = list.filter(function(file){
                        return path.extname(file) === '.' + ext;
                });
                callback(null, list);
        });
};
program.js
var mymodule = require('./mymodule.js');
var folder = process.argv[2];
var ext = process.argv[3];
mymodule(folder, ext, function(err, files){
        if(err)
                console.error('There was an error:', err);
        files.forEach(function(file){
                console.log(file);
        });
});

7: 

var http = require('http');
var url = process.argv[2];
http.get(url, function(response){
  response.setEncoding('utf8'); 
  response.on("data", function(data){
    console.log(data);
  });
});

    
    var http = require('http')
    
    http.get(process.argv[2], function (response) {
      response.setEncoding('utf8')
      response.on('data', console.log)
      response.on('error', console.error)
    }).on('error', console.error)

8:
    var http = require('http');
    var bl = require('bl');
    http.get(process.argv[2], function (response) {
      response.pipe(bl(function(err, data){
        if(err)
          return console.error(err);
        data = data.toString();
        console.log(data.length);
        console.log(data);
      }));
    });
npm install bl --registry http://registry.npmjs.org/

9:
    var http = require('http');
    var bl = require('bl');
    var count = 0;
    var res = [];

    function printResults(){
      for(var i = 0; i < 3; i++)
        console.log(res[i]);
    }

    function httpGet(index){
      http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function(err, data){
          if(err)
            return console.error(err);
          res[index] = data.toString();
          count++;

          if(count == 3)
            printResults();
        }));
      });
    }

    for(var i = 0; i < 3; i++)
      httpGet(i);

var http = require('http')
var bl = require('bl')
var results = []
var count = 0
 
function printResults () {
  for (var i = 0; i < 3; i++)
    console.log(results[i])
}
 
function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err)
        return console.error(err)
 
      results[index] = data.toString()
      count++
 
      if (count == 3)
        printResults()
    }))
  })
}
 
for (var i = 0; i < 3; i++)
  httpGet(i)

10:

var net = require('net')

function zeroFill(i){
  return (i < 10 ? '0' : '') + i
}

function getDate(){
  var date = new Date()
  return date.getFullYear() + '-' + zeroFill(date.getMonth() + 1) + '-' +
  zeroFill(date.getDate()) + ' ' + zeroFill(date.getHours()) + ':' + 
  zeroFill(date.getMinutes());
  
}

var server = net.createServer(function(socket){ 
  socket.end(getDate() + '\n')
})

server.listen(Number(process.argv[2]))

11:

var http = require('http');
var fs = require('fs')
var server = http.createServer(function(req, res){
  res.writeHead(200, { 'content-type': 'text/plain' })
  fs.createReadStream(process.argv[3]).pipe(res)
})
server.listen(Number(process.argv[2]))

12:

var http = require('http');
var map = require('through2-map')  
var server = http.createServer(function(req, res){
  if (req.method == 'POST') {
    req.pipe(map(function (chunk) {  
      return chunk.toString().toUpperCase() 
    })).pipe(res)
  }
})
server.listen(Number(process.argv[2]))

13:

var http = require('http'); 
var url = require('url');

var parseTime = function(time){
  return {
    hour : time.getHours(),
    minute : time.getMinutes(),
    second : time.getSeconds()
  }
}

var unixTime = function(time){
  return {
    unixtime : time.getTime()
  }
}

var parseQuery = function(url){
  var time = new Date(url.query.iso)
  if(url.pathname == '/api/parsetime')
    return parseTime(time)
  else if(url.pathname == '/api/unixtime')
    return unixTime(time)
}

var server = http.createServer(function(req, res){
  
  if (req.method == 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' }) 
    url = url.parse(req.url, true)
    res.end(JSON.stringify(parseQuery(url)))
  }
})
server.listen(Number(process.argv[2]))
     
     

