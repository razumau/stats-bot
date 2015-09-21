'use strict';
// const events = require('eventemitter2');
const rp = require('request-promise');
const moment = require('moment');
const config = require('./config.js');
let cron = require('cron');

class Metric {
    constructor(options, emitter) {
        this.name = options.name;
        this.emitter = emitter;
        this.requestOptions = {
        	url: "http://kibana.tpminsk.by/elasticsearch/_msearch",
        	body: buildKibanaRequest(options.url),
        	method: "POST"
        };
        this.channel = options.channel;
        this.shouldRise = options.shouldRise;

        this.job = new cron.CronJob(options.cronPattern, this.getData.bind(this), null, true);
        console.log(`Cron job for ${this.name} created`);
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
*${percentageString(percentage)}*`;


        data.mood = Math.abs(percentage) < 5 
        			? 'none'
        			: (thisWeek > lastWeek) === this.shouldRise  
        				? 'happy' 
        				: 'sad';
        data.channel = this.channel;
        data.name = this.name;

        this.emitter.emit(`receive.${this.name}`, data);
    }
}

module.exports = Metric;

function percentageString(percentage) {
    	return (percentage < 0)
    			? `−${Math.abs(percentage.toFixed(1))}%`
    			: `+${percentage.toFixed(1)}%`;
}

function buildIndices () {
	let logstashes = [],
		date = moment().subtract(13, 'days');

	for (let i = 0; i < 14; i++) {
		logstashes.push(`"logstash-${date.format('YYYY.MM.DD')}"`);
		date.add(1, 'days');
	}

	return `{"index":[${logstashes.join(',')}]}\n`;
}

function buildFilter() {
	let now = moment().valueOf(),
		twoWeeksAgo = moment().subtract(2, 'weeks').valueOf();

	return `"filter":{"bool":{"must":[{"range":{"@timestamp":{"gte":${twoWeeksAgo},"lte":${now}}}}],"must_not":[]}}}},"size":0,"aggs":{"1":{"date_histogram":{"field":"@timestamp","interval":"1w","min_doc_count":1,"extended_bounds":{"min":${twoWeeksAgo},"max":${now}}},"aggs":{"2":{"percentiles":{"field":"response_time","percents":[50]}}}}}}\n`;

}

function buildKibanaRequest(url) {
      	return buildIndices() 
      		+ `{"query":{"filtered":{"query":{"query_string":{"query":"uri: \\"`    		
    		+ `${url}\\""}},`
    		+ buildFilter();
}
