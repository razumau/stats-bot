'use strict';
const rp = require('request-promise');
const moment = require('moment');
const config = require('./config.js');
const cron = require('cron');

class Metric {
    constructor(options, emitter) {
        this.name = options.name;
        this.emitter = emitter;
        this.requestOptions = {
            'median': {
                    url: "http://kibana.tpminsk.by/elasticsearch/_msearch",
                    body: buildKibanaRequest(options.url, 50),
                    method: "POST"
        }, '95th': {
                    url: "http://kibana.tpminsk.by/elasticsearch/_msearch",
                    body: buildKibanaRequest(options.url, 95),
                    method: "POST"
        } };
        this.channel = options.channel || 'test-bot';
        this.shouldRise = options.shouldRise;

        this.job = new cron.CronJob(options.cronPattern, this.getData.bind(this), null, true);
        console.log(`Cron job for ${this.name} created`);
    }

    getData() {
        rp(this.requestOptions['median'])
            .then(data => this.sendData(data, '50.0'));
        rp(this.requestOptions['95th'])
            .then(data => this.sendData(data, '95.0'));
    }

    sendData(response, percentile) {
        let data = {};

        let result = JSON.parse(response).responses[0].aggregations['1'];

        let lastWeek = result.buckets[0]['2'].values[percentile],
        	thisWeek = result.buckets[1]['2'].values[percentile],
        	percentage = (thisWeek - lastWeek) / lastWeek * 100;


        data.text = `Last week: ${(lastWeek * 1000).toFixed(0)} ms.
This week: ${(thisWeek * 1000).toFixed(0)} ms.
*${percentageString(percentage)}*`;


        data.mood = Math.abs(percentage) < 5 
        			? 'none'
        			: (thisWeek > lastWeek) === this.shouldRise  
        				? 'happy' 
        				: 'sad';
        if (data.mood === 'none') {
            data.channel = '@jury.razumau'
        } else {
            data.channel = this.channel;
        }

        data.name = `${this.name} ${percentile === '50.0' ? 'median' : '95th percentile'}`;

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

function buildFilter(percentile) {
	let now = moment().valueOf(),
		twoWeeksAgo = moment().subtract(2, 'weeks').valueOf();

	return `"filter":{"bool":{"must":[{"range":{"@timestamp":{"gte":${twoWeeksAgo},"lte":${now}}}}],"must_not":[]}}}},"size":0,"aggs":{"1":{"date_histogram":{"field":"@timestamp","interval":"1w","min_doc_count":1,"extended_bounds":{"min":${twoWeeksAgo},"max":${now}}},"aggs":{"2":{"percentiles":{"field":"response_time","percents":[${percentile}]}}}}}}\n`;

}

function buildKibanaRequest(url, percentile) {
      	return buildIndices() 
      		+ `{"query":{"filtered":{"query":{"query_string":{"query":"uri: \\"`    		
    		+ `${url}\\""}},`
    		+ buildFilter(percentile);
}
