"strict mode";

// DOM manipulation
const message = document.querySelector("small");
const btnSubmit = document.querySelector("#btn__submit");
// INPUT
const allInputs = document.querySelectorAll("input");
const dobInput = document.querySelector("#day");
const domInput = document.querySelector("#month");
const doyInput = document.querySelector("#year");

//OUTPUT
const dayOutput = document.querySelector("#days");
const monthOutput = document.querySelector("#months");
const yearOutput = document.querySelector("#years");

let date = new Date();
let today = date.getDay();
let currMonth = date.getMonth() + 1; // cause month starts with 0
let currYear = date.getFullYear();

// input validation
const inputValidator = function () {
	let validator = true;
	if (!dobInput.value && dobInput.value > 31) {
		dobInput.nextElementSibling.innerHTML = "Must a valid date.";
		dobInput.style.borderColor = "red";
		validator = false;
	} else if (domInput.value > 12) {
		domInput.nextElementSibling.innerHTML = "Must be a valid month.";
		domInput.style.borderColor = "red";
		validator = false;
	} else if (doyInput.value > currYear) {
		doyInput.nextElementSibling.innerHTML = "Must be in the past.";
		doyInput.style.borderColor = "red";
		validator = false;
	}

	allInputs.forEach((input) => {
		if (input.value === undefined)
			message.innerHTML = "This field is required..";
		validator = false;
	});
	return validator;
};

// Age calculation
const calcAge = (birthDay, birthMonth, birthYear) => {
	// days of every month
	const dayCountMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if (birthDay > today) {
		today = today + dayCountMonth[birthMonth - 1];
		currMonth -= 1;
	}
	if (birthMonth > currMonth) {
		currYear -= 1;
		currMonth += 12;
	} else {
		return;
	}

	const resDate = today - birthDay;
	const resMonth = currMonth - birthMonth;
	const resYear = currYear - birthYear;
	// Set output
	const day = (dayOutput.innerHTML = resDate);
	const month = (monthOutput.innerHTML = resMonth);
	const year = (yearOutput.innerHTML = resYear);
	dobInput.value = "";
	domInput.value = "";
	doyInput.value = "";

	// prettier-ignore
	return (day, month, year);
};

const handleSubmit = function (e) {
	e.preventDefault();
	if (inputValidator) {
		calcAge(dobInput.value, domInput.value, doyInput.value);
	}
};
btnSubmit.addEventListener("click", handleSubmit);
