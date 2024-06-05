console.log('app.js');

const currentDateDisplay = document.querySelector('.current-date');
const btnCalendar = document.getElementById('btn-calendar');
const calContainer = document.getElementById('calendar');

class App {
	constructor() {
		this.init();
		btnCalendar.addEventListener('click', this.render.bind(this));
		// In order to bind the App class to the render method, we need to bind it with the 'this' keyword. It ensures that 'this' refers to the right object which is the App class
	}

	init() {
		this.calendar = new Calendar('agenda', 'public');
		this.calendar.showCurrentDate();
	}

	render() {
		console.log(this); // show this with and without the bind on the callback function in the addEventListener
		console.log('App rendered');
		console.log(this.calendar);

		if (this.calendar.security === 'private') {
			console.log('Private mode: calendar not available');
			return;
		}
		this.calendar.createCalendar();
	}
}

class Calendar {
	#user = 'John Doe';
	#security = 'public';
	mode = 'agenda';
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

	constructor(mode, security) {
		this.mode = mode;
		this.#security = security;

		this.today = this.getCurrentDate();
		this.month = this.getMonthName(this.today);
	}

	createCalendar() {
		// this returns an object with the days of the week and the dates on the calendar relative to today
		const calendarDays = this._getDaysOfWeek(this.today);
		console.log('daysOfWeek', calendarDays);

		const df = document.createDocumentFragment();
		const monthText = document.createElement('h2');
		const daysList = document.createElement('ul');
		daysList.classList.add('days', this.mode === 'agenda' ? 'agenda' : 'list');

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

	showCurrentDate() {
		console.log('Current date: ', this.today);
		currentDateDisplay.textContent = this.month + ' ' + this.today.getDate();
	}

	getCurrentDate() {
		return new Date();
	}

	getMonthName(date) {
		return date.toLocaleDateString('en-US', { month: 'long' });
	}

	_getDaysOfWeek(date) {
		console.log('date', date);
		this.dates = [];
		this.dayOfWeek = [];

		for (let i = -3; i <= 3; i++) {
			const newDate = new Date(date);
			this.dates.push(newDate.getDate() + i);
			this.dayOfWeek.push(this.daysNames[(newDate.getDay() + i + 3) % 7]);
		}
		return { dates: this.dates, daysNames: this.daysNames };
	}

	get security() {
		return this.#security; // Add the # to indicate that this is a private property that should not be accessed from outside the class and should only be retrieved using the get method
	}

	set security(value) {
		console.log('Value: ', value);
		if (value === 'public' || value === 'private') {
			this.#security = value; // Add the # to indicate that this is a private property that should not be accessed from outside the class and should only be updated using the set method
		} else {
			console.log('Invalid security value');
		}
	}
}

const app = new App();
