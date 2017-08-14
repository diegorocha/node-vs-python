const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const app = express();

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

app.use(bodyParser.json());

app.get('/api/tasks/:key', function (req, res) {
  const sequelize = new Sequelize('mysql://root@mysql/db', {logging: false});
  var model = sequelize.import("models/task.js");
  model.findOne({where: {key: req.params.key}}).then(task => {
    sequelize.close()
    if(task != undefined){
      res.status(200).send(task);
    }else{
      res.status(404).end();
    }
  });
});

app.post('/api/tasks', function (req, res) {
  var data = req.body;
  if(data != undefined && data.hasOwnProperty('foo')){
    send_message_queue(data, function(){
      res.status(201).end();
    });
  }else{
    res.status(400).send({"error": "foo is required"});
  }
});

app.listen(8000, function () {
  console.log('Server running at :8000');
});
