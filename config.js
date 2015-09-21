'use strict';
const everyMonday = '0 11 * * 1';
const test = '0 21 * * 1'

module.exports = {
	metrics: [{
		name: 'Cells median',
		url: '/slice/v1/matrix/cells',
		cronPattern: '0 2 * * *',
		shouldRise: false,
		channel: "test-bot"

	}, {
		name: 'CardsDetails median',
		url: 'cardsDetails',
		cronPattern: test,
		shouldRise: false,
		channel: "test-bot"

	}, {
		name: 'GlobalDataTemplates median',
		url: 'globalDataTemplates',
		cronPattern: test,
		shouldRise: false,
		channel: "test-bot"

	}, {
		name: 'AxesCounts median',
		url: '/slice/v1/matrix/axesCounts',
		cronPattern: test,
		shouldRise: false,
		channel: "test-bot"

	}, {
		name: 'ViewDataTemplates median',
		url: 'ViewDataTemplates',
		cronPattern: test,
		shouldRise: false,
		channel: "test-bot"

	}, {
		name: 'UserStories median',
		url: '/api/v1/UserStories',
		cronPattern: test,
		shouldRise: false,
		channel: "test-bot"

	}, {
		name: 'Context median',
		url: '/api/v2/context',
		cronPattern: test,
		shouldRise: false,
		channel: "test-bot"

	}/*, {
		name: 'View list median',
		url: '("api/views/v1" -"/api/views/v1/view")',
		cronPattern: '* * * * * *',
		shouldRise: false,
		channel: "test-bot"

	}*/]
};
