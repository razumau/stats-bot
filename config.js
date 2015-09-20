module.exports = {
	metrics: [{
		name: 'Cells request median time',
		url: '/slice/v1/matrix/cells',
		cronPattern: '0 20 * * 0',
		shouldRise: false,
		channel: "test-bot"

	}, {
		name: 'CardsDetails request median time',
		url: '/slice/v1/matrix/cardsDetails',
		cronPattern: '0 21 * * 0',
		shouldRise: false,
		channel: "test-bot"

	}, {
		name: 'GlobalDataTemplates request median time',
		url: 'globalDataTemplates',
		cronPattern: '0 21 * * 0',
		shouldRise: false,
		channel: "test-bot"

	}, {
		name: 'AxesCounts request median time',
		url: '/slice/v1/matrix/axesCounts',
		cronPattern: '0 22 * * 0',
		shouldRise: false,
		channel: "test-bot"

	}, {
		name: 'ViewDataTemplates request median time',
		url: 'ViewDataTemplates',
		cronPattern: '0 22 * * 0',
		shouldRise: false,
		channel: "test-bot"

	}, {
		name: 'UserStories request median time',
		url: '/api/v1/UserStories',
		cronPattern: '0 22 * * 0',
		shouldRise: false,
		channel: "test-bot"

	}, {
		name: 'Context request median time',
		url: '/api/v2/context',
		cronPattern: '0 22 * * 0',
		shouldRise: false,
		channel: "test-bot"

	}/*, {
		name: 'View list request median time',
		url: '("api/views/v1" -"/api/views/v1/view")',
		cronPattern: '* * * * * *',
		shouldRise: false,
		channel: "test-bot"

	}*/],

	body: ['{"index":["logstash-2015.09.07","logstash-2015.09.08","logstash-2015.09.09","logstash-2015.09.10","logstash-2015.09.11","logstash-2015.09.12","logstash-2015.09.13","logstash-2015.09.14","logstash-2015.09.15","logstash-2015.09.16","logstash-2015.09.17","logstash-2015.09.18","logstash-2015.09.19","logstash-2015.09.20"]}\n{"query":{"filtered":{"query":{"query_string":{"query":"uri: \\"', 
		'\\""}},"filter":{"bool":{"must":[{"range":{"@timestamp":{"gte":1441545991580,"lte":1442755591580}}}],"must_not":[]}}}},"size":0,"aggs":{"1":{"date_histogram":{"field":"@timestamp","interval":"1w","min_doc_count":1,"extended_bounds":{"min":1441545991579,"max":1442755591579}},"aggs":{"2":{"percentiles":{"field":"response_time","percents":[50]}}}}}}\n']
}
