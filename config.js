module.exports = {
	metrics: [{
		name: 'Daily users',
		url: 'https://google.com',
		timeout: 5,
		shouldRise: true,
		channel: "test-bot"

	}, {
		name: 'Median loading time, s',
		url: 'https://facebook.com',
		timeout: 10,
		shouldRise: false,
		channel: "test-bot"

	} ]
}
