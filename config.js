'use strict';
const everyMonday = '0 12 * * 1';
const test = '25 12 * * 1'

module.exports = {
	metrics: [{
		name: 'Cells',
		url: '/slice/v1/matrix/cells',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"
	}, {
		name: 'CardsDetails',
		url: 'cardsDetails',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"

	}, {
		name: 'GlobalDataTemplates',
		url: 'globalDataTemplates',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"

	}, {
		name: 'AxesCounts',
		url: '/slice/v1/matrix/axesCounts',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"

	}, {
		name: 'ViewDataTemplates',
		url: 'ViewDataTemplates',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"

	}, {
		name: 'UserStories',
		url: '/api/v1/UserStories',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"

	}, {
		name: 'Context',
		url: '/api/v2/context',
		cronPattern: test,
		shouldRise: false,
		channel: "#performance"

	}]
};
