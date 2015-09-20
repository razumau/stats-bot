'use strict';
// const events = require('eventemitter2');
const rp = require('request-promise');
const config = require('./config.js')
let cron = require('cron');

class Metric {
    constructor(options, emitter) {
        this.name = options.name;
        this.emitter = emitter;
        this.requestOptions = {
        	url: "http://kibana.tpminsk.by/elasticsearch/_msearch",
            body: config.body[0] + options.url + config.body[1],
            method: "POST"
        };
        this.channel = options.channel;
        this.cronPattern = options.cronPattern;
        this.shouldRise = options.shouldRise;

        this.job = new cron.CronJob(this.cronPattern, this.getData.bind(this), null, true);
        //let job = cron.CronJob(this.cronPattern, this.getData, null, true);

            //setTimeout(this.getData.bind(this), this.timeout);
    }

    getData() {
        rp(this.requestOptions).then(this.sendData.bind(this));
    }

    sendData(response) {
        let data = {};

        let result = JSON.parse(response).responses[0].aggregations['1'];

        let lastWeek = result.buckets[0]['2'].values['50.0'],
        	thisWeek = result.buckets[1]['2'].values['50.0'],
        	percentage = (thisWeek - lastWeek) / lastWeek * 100;


        data.text = `Last week: ${lastWeek.toFixed(3) * 1000} ms.
This week: ${thisWeek.toFixed(3) * 1000} ms.
*${this.percentageString(percentage)}*`;


        data.mood = Math.abs(percentage) < 5 
        			? 'none'
        			: (thisWeek > lastWeek) === this.shouldRise  
        				? 'happy' 
        				: 'sad';
        data.channel = this.channel;
        data.name = this.name;

        this.emitter.emit(`receive.${this.name}`, data);
    }

    percentageString(percentage) {
    	return (percentage < 0)
    			? `−${Math.abs(percentage.toFixed(1))}%`
    			: `+${percentage.toFixed(1)}%`
    }
}

module.exports = Metric;
