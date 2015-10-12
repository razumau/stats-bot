'use strict';
const rp = require('request-promise');
const moment = require('moment');
const config = require('./config.js');
const emojis = require('emoji-mood');
const cron = require('cron');
const _ = require('lodash');
const clark = require('clark');

class Metric {
    constructor(options, emitter) {
        this.name = options.name;
        this.emitter = emitter;

        if (options.performance) {
            this.channel = '#performance';
            this.requestOptions = {
                'median': {
                    url: process.env[options.kibana],
                    body: buildKibanaRequest(options.searchString, 50),
                    method: "POST"
                },
                '95th': {
                    url: process.env[options.kibana],
                    body: buildKibanaRequest(options.searchString, 95),
                    method: "POST"
                }
            };
        } else if (options.product) {
            this.channel = 'test-bot';
        } else {
            this.channel = options.channel || 'test-bot';
        }

        if (options.kibana === 'logstash') {
            this.index = 'logstash';
        } else {
            this.index = options.index;
        }

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
        let data = {},
            values = _.pluck(_.pluck(JSON.parse(response).responses[0].aggregations['1'].buckets,
                                `2.values`), percentile);

        let len = values.length,
            lastWeek = values[len - 2],
            thisWeek = values[len - 1],
            percentage = (thisWeek - lastWeek) / lastWeek * 100;

        data.text = `Last week: ${(lastWeek * 1000).toFixed(0)} ms.\n` 
                    + `This week: ${(thisWeek * 1000).toFixed(0)} ms.\n` 
                    + `*${percentageString(percentage)}*`;

        data.mood = Math.abs(percentage) < 10
            ? 'none' 
            : (thisWeek > lastWeek) === this.shouldRise 
                ? 'happy' 
                : 'sad';

        if (data.mood === 'none') {
            data.channel = '@jury.razumau';
        } else {
            data.channel = this.channel;
            data.text += `${emojis.getEmoji(data.mood)}\n`;
            values = _.tail(_.map(values, val => (val * 1000).toFixed(0)));
            data.text += `Previous weeks: ${clark(values)} _(${values.join(', ')})_`;
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

function buildIndices(index, days) {
    let indices = [],
        date = moment().subtract(days - 1, 'days');

    for (let i = 0; i < days; i++) {
        indices.push(`"${index}-${date.format('YYYY.MM.DD')}"`);
        date.add(1, 'days');
    }

    return `{"index":[${indices.join(',')}]}\n`;
}

function buildFilter(percentile, daysAgo, interval) {
    let now = moment().valueOf(),
        earlier = moment().subtract(daysAgo, 'days').valueOf();

    if (_.includes(['d', 'w', 'm'], interval) === false) {
        throw new Error('This interval is not supported');
    }

    return `"filter":{"bool":{"must":[{"range":{"@timestamp":{"gte":${earlier},"lte":${now}}}}],"must_not":[]}}}},"size":0,"aggs":{"1":{"date_histogram":{"field":"@timestamp","interval":"1${interval}","min_doc_count":1,"extended_bounds":{"min":${earlier},"max":${now}}},"aggs":{"2":{"percentiles":{"field":"response_time","percents":[${percentile}]}}}}}}\n`;

}

function buildKibanaRequest(searchString, percentile) {
    return buildIndices("logstash", 42) 
        //+ `{"query":{"filtered":{"query":{"query_string":{"query":"uri: \\"` + `${searchString}\\""}},` 
        + `{"query":{"filtered":{"query":{"query_string":{"query":"${searchString}"}},` 
        + buildFilter(percentile, 42, 'w');
}
