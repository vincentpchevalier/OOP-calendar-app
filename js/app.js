console.log('app.js');

const btnCalendar = document.getElementById('btn-calendar');
const calContainer = document.getElementById('calendar');

class App {
	_agenda;
	constructor() {
		this.init();
		btnCalendar.addEventListener('click', this.render.bind(this));
		// In order to bind the App class to the render method, we need to bind it with the 'this' keyword. It ensures that 'this' refers to the right object which is the App class
	}

	init() {
		this._agenda = new Agenda('calendar', 'public');
	}

	render() {
		console.log(this); // show this with and without the bind on the callback function in the addEventListener
		console.log('App rendered');
		console.log(this._agenda);

		if (this._agenda.security === 'private') {
			console.log('Private mode: calendar not available');
			return;
		}
		this._agenda.createCalendar();
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
		const calendarDays = this._getDaysOfWeek(this.today); // this returns an object with the days of the week and the dates on the calendar relative to today
		console.log('daysOfWeek', calendarDays);
		this.calendarStyle(this.mode);

		const df = document.createDocumentFragment();
		const monthText = document.createElement('h2');
		const daysList = document.createElement('ul');

		const dateCellHTML = calendarDays.dates
			.map((date, i) => {
				const dayName = calendarDays.daysNames[i];
				return `
        <li class="dateCell">
						<p class="day">${dayName}</p>
						<p class="date">${date}</p>
					</li>
      `;
			})
			.join('');

		daysList.innerHTML = dateCellHTML;
		monthText.textContent = this.month;
		df.appendChild(monthText);
		df.appendChild(daysList);
		calContainer.innerHTML = '';
		calContainer.appendChild(df);
	}

	calendarStyle(mode) {
		if (mode === 'agenda') {
			console.log('Mode: agenda');
			calContainer.classList.add('agenda');
		}

		if (mode === 'list') {
			console.log('Mode: list');
			calContainer.classList.add('list');
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
		return { dates: this.dates, daysNames: this.daysNames };
	}

	_getMonthName(date) {
		return date.toLocaleDateString('en-US', { month: 'long' });
	}
}

const app = new App();
