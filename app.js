'use strict';
const express = require('express');
const rp = require('request-promise');
const _ = require('lodash');
const events = require('eventemitter2');
const emojis = require('emoji-mood');
const Metric = require('./metric.js');
const config = require('./config.js');
const cron = require('cron');

let app = express();
let emitter = new events.EventEmitter2({wildcard: true});

let constructMessage = function (data) {
	let date = (new Date()).toLocaleDateString(),
	    emoji = emojis.getEmoji(data.mood);

	return {
		json: {
			text: `${data.name}: ${data.text} ${emoji}`,
			//icon_emoji: emojis.getEmoji(data.mood),
			channel: data.channel
		},    
		url: process.env.SLACK_URL,
		method: 'POST'
	};
};

app.set('port', (process.env.PORT || 5005));

emitter.on('receive.*', function (data) {
	rp(constructMessage(data))
		.then(response => console.log(response));
});

let metrics = _.map(config.metrics, metric => new Metric(metric, emitter));

//console.log(config.BODY);
/*
rp({
	url: "http://kibana.tpminsk.by/elasticsearch/_msearch",
	method: "POST",
	body: config.body[0] + '/slice/v1/matrix/cells' + config.body[1],
}).then(response => parse(response));

function parse (response) {
	let result = JSON.parse(response);

	let firstWeek = result.responses[0].aggregations['1'].buckets[0]['2'].values['50.0'];
	console.log(firstWeek);
}*/
