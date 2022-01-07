const mqttData = require('../models/mqtt');
const mqtt = require('mqtt');

function MqttData(){}; 
MqttData.prototype.getResults = async (req, res , next)=> {
    mqttData.find({}, function(err, data) {
      res.json(data);      });
};

MqttData.prototype.addmqtt = (infos)=> {
  mqttData.createmqtt(infos);
};
module.exports = MqttData;