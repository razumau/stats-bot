'use strict';
const express = require('express');
const rp = require('request-promise');
const _ = require('lodash');
const events = require('eventemitter2');
const cron = require('cron');
const Metric = require('./metric.js');
const config = require('./config.js');

let app = express();
let emitter = new events.EventEmitter2({wildcard: true});

let constructMessage = function (data) {
	let date = (new Date()).toLocaleDateString();

	return {
		json: {
			text: `*${data.name}*\n${data.text}`,
			channel: data.channel
		},    
		url: process.env.SLACK_URL,
		method: 'POST'
	};
};

emitter.on('receive.*', function (data) {
	rp(constructMessage(data))
		.then(response => console.log(response));
});

let metrics = _.map(config.metrics, metric => new Metric(metric, emitter));
