'use strict';
const everyMonday = '0 12 * * 1';
const test = '0 51 11 * * *'
const test2 = '30 51 11 * * *'
const test3 = '0 52 11 * * *'
const test4 = '30 52 11 * * *'

module.exports = {
	metrics: [{
		name: 'Cells',
		searchString: 'uri:\\"/slice/v1/matrix/cells\\"',
		cronPattern: test,
		shouldRise: false,
		kibana: 'logstash',
		performance: true
	},
	 {
		name: 'CardsDetails',
		searchString: 'uri:\\"cardsDetails\\"',
		cronPattern: test,
		shouldRise: false,
		kibana: 'logstash',
		performance: true

	}, {
		name: 'GlobalDataTemplates',
		searchString: 'uri:\\"globalDataTemplates\\"',
		cronPattern: test,
		shouldRise: false,
		kibana: 'logstash',
		performance: true

	}, {
		name: 'AxesCounts',
		searchString: 'uri:\\"/slice/v1/matrix/axesCounts\\"',
		cronPattern: test,
		shouldRise: false,
		kibana: 'logstash',
		performance: true

	}, {
		name: 'ViewDataTemplates',
		searchString: 'uri:\\"ViewDataTemplates\\"',
		cronPattern: test2,
		shouldRise: false,
		kibana: 'logstash',
		performance: true

	}, {
		name: 'UserStories',
		searchString: 'uri:\\"/api/v1/UserStories\\"',
		cronPattern: test2,
		shouldRise: false,
		kibana: 'logstash',
		performance: true

	}, {
		name: 'Context',
		searchString: 'uri:\\"/api/v2/context\\"',
		cronPattern: test2,
		shouldRise: false,
		kibana: 'logstash',
		performance: true
	}, {
		name: 'Xaxis',
		searchString: 'uri:\\"/slice/v1/matrix/xaxis\\"',
		cronPattern: test2,
		shouldRise: false,
		kibana: 'logstash',
		performance: true
	}, {
		name: 'Yaxis',
		searchString: 'uri:\\"/slice/v1/matrix/yaxis\\"',
		cronPattern: test3,
		shouldRise: false,
		kibana: 'logstash',
		performance: true
	}, {
		name: 'GeneralFollowers',
		searchString: 'uri:\\"/api/v1/generalFollowers\\"',
		cronPattern: test3,
		shouldRise: false,
		kibana: 'logstash',
		performance: true
	}, {
		name: 'TreeView',
		searchString: 'uri:\\"/slice/v1/TreeView/treeView\\"',
		cronPattern: test3,
		shouldRise: false,
		kibana: 'logstash',
		performance: true
	}, {
		name: 'TreePossibleActions',
		searchString: 'uri:\\"/slice/v1/TreeView/treePossibleActions\\"',
		cronPattern: test3,
		shouldRise: false,
		kibana: 'logstash',
		performance: true
	}, {
		name: 'Report',
		searchString: 'uri:\\"/slice/v1/report\\"',
		cronPattern: test4,
		shouldRise: false,
		kibana: 'logstash',
		performance: true
	}, {
		name: 'Timeline density',
		searchString: 'uri:\\"/slice/v1/timeline/density\\"',
		cronPattern: test4,
		shouldRise: false,
		kibana: 'logstash',
		performance: true
	}, {
		name: 'Milestones',
		searchString: 'uri:\\"/slice/v1/timeline/milestones\\"',
		cronPattern: test4,
		shouldRise: false,
		kibana: 'logstash',
		performance: true
	}
	// }, {
	// 	name: 'Initial load time',
	// 	searchString: '*',
	// 	cronPattern: test2,
	// 	shouldRise: false,
	// 	kibana: 'taus',
	// 	index: 'tauspy-initial.load.times',
	// 	performance: true
	// }
	]
};
