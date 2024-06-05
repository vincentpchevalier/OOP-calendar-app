console.log('app.js');

const btnCalendar = document.getElementById('btn-calendar');
const calContainer = document.getElementById('agenda');

class App {
	_agenda;
	constructor() {
		this.init();
		btnCalendar.addEventListener('click', this.render.bind(this)); // ensures that this refers to the right object which is the App class
	}

	init() {
		this._agenda = new Agenda('calendar', 'private');
	}

	render() {
		console.log('App rendered');
		console.log(this._agenda);
	}
}

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

	constructor(mode = 'calendar', security = 'public') {
		this.mode = mode;
		this.security = security;

		this.today = this._getCurrentDate();
		this.month = this._getMonthName(this.today);
		this.createCalendar();
	}

	get security() {
		return this._security;
	}

	set security(value) {
		console.log('Value: ', value);
		if (value === 'public' || value === 'private') {
			this._security = value;
		} else {
			console.log('Invalid security value');
		}
	}

	createCalendar() {
		this._getDaysOfWeek(this.today);
		this.calendarStyle(this.mode);
	}

	calendarStyle(mode) {
		if (mode === 'calendar') {
			console.log('Mode: calendar');
		}
	}

	_getCurrentDate() {
		return new Date();
	}

	_getDaysOfWeek(date) {
		console.log('date', date);
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

const app = new App();
