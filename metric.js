'use strict';
// const events = require('eventemitter2');
const rp = require('request-promise');
const config = require('./config.js')
const cron = require('cron');

class Metric {
    constructor(options, emitter) {
        this.name = options.name;
        this.emitter = emitter;
        this.requestOptions = {
            url: config.body[0] + options.url + config.body[1],
            method: "GET"
        };
        this.channel = options.channel;
        this.cronPattern = options.cronPattern;
        this.shouldRise = options.shouldRise;

        let job = cron.CronJob(this.cronPattern, function() {console.log("asdf")}, null, true);
        //let job = cron.CronJob(this.cronPattern, this.getData, null, true);

            //setTimeout(this.getData.bind(this), this.timeout);
    }

    getData() {
        rp(this.requestOptions).then(this.sendData.bind(this));
    }

    sendData(response) {
        let data = {},
            newValue = 5,
            previousValue = 3;


        let result = JSON.parse(response);

        let firstWeek = result.responses[0].aggregations['1'].buckets[0]['2'].values['50.0'];

        data.text = `last week: ${firstWeek}, this week: ${newValue}.`;
        data.mood = (newValue > previousValue) === this.shouldRise ? 'happy' : 'sad';
        data.channel = this.channel;
        data.name = this.name;

        this.emitter.emit(`receive.${this.name}`, data);
    }
}

module.exports = Metric;
