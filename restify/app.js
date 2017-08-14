var restify = require('restify');

var amqp = require('amqplib/callback_api');

var send_message_queue = function(data, callback){
    amqp.connect('amqp://user:pass@rabbit/vhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
          var q = 'tasks';
          ch.assertQueue(q, {durable: false});
          ch.sendToQueue(q, new Buffer(JSON.stringify(data)));
          callback();
        });
        setTimeout(function() { conn.close(); }, 500);
    });
};

var server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post('/api/tasks', function(req, res, next) {
  var data = req.body;
  if(data != undefined && data.hasOwnProperty('foo')){
    send_message_queue(data, function(){
      res.send(201);
      next();
    });
  }else{
    res.send(400, {"error": "foo is required"});
    next();
  }
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
