console.log('app.js');

const calContainer = document.getElementById('agenda');

class Agenda {
	dates = [];
	dayOfWeek = [];
	daysNames = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	constructor() {
		this.init();
		this.today = this._getCurrentDate();
		this.month = this._getMonthName(this.today);
	}

	init() {
		this.render();
	}

	render() {
		console.log('App rendered');
	}

	_getCurrentDate() {
		return new Date();
	}

	_getDaysOfWeek(date) {
		for (let i = -3; i <= 3; i++) {
			const newDate = new Date(date);
			this.dates.push(newDate.getDate() + i);
			this.dayOfWeek.push(this.daysNames[(newDate.getDay() + i + 3) % 7]);
		}
	}

	_getMonthName(date) {
		return date.toLocaleDateString('en-US', { month: 'long' });
	}
}

const app = new Agenda();
