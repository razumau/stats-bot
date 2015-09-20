'use strict';
// const events = require('eventemitter2');
const rp = require('request-promise');
const cron = require('cron');

class Metric {
	constructor(options, emitter) {
		this.name = options.name;
		this.emitter = emitter;
		this.requestOptions = {
			url: options.url,
			method: "GET"
		};
		this.channel = options.channel;
		this.cronPattern = options.cronPattern;
		this.shouldRise = options.shouldRise;

		let this.job = cron.CronJob(this.cronPattern, this.getData.bind(this))
		//setTimeout(this.getData.bind(this), this.timeout);
	}

	getData() {
		rp(this.requestOptions).then(this.sendData.bind(this));
	}

	sendData(response) {
		let data = {},
			newValue = 5,
			previousValue = 3;


		//parse response
		
		data.text = `last week: ${previousValue}, this week: ${newValue}.`;
		data.mood = (newValue > previousValue) === this.shouldRise ? 'happy' : 'sad';
		data.channel = this.channel;
		data.name = this.name;

		this.emitter.emit(`receive.${this.name}`, data);
	}
}

module.exports = Metric;
