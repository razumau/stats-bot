'use strict';
const everyMonday = '0 11 * * 1';
const test = '45 12 * * 2'

module.exports = {
	metrics: [{
		name: 'Cells median',
		url: '/slice/v1/matrix/cells',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"

	}, {
		name: 'CardsDetails median',
		url: 'cardsDetails',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"

	}, {
		name: 'GlobalDataTemplates median',
		url: 'globalDataTemplates',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"

	}, {
		name: 'AxesCounts median',
		url: '/slice/v1/matrix/axesCounts',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"

	}, {
		name: 'ViewDataTemplates median',
		url: 'ViewDataTemplates',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"

	}, {
		name: 'UserStories median',
		url: '/api/v1/UserStories',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"

	}, {
		name: 'Context median',
		url: '/api/v2/context',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"

	}/*, {
		name: 'View list median',
		url: '("api/views/v1" -"/api/views/v1/view")',
		cronPattern: '* * * * * *',
		shouldRise: false,
		channel: "test-bot"

	}*/]
};
