'use strict';
const everyMonday = '0 11 * * 1';

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

	}*/]
};
