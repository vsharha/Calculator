var previous_calculation = 0;
var calculation = 0;
var display = "";

var last_op = "";

const buttons = document.querySelectorAll("button");

// on ready

function onReady() {
	update_screen(0);

	for (let button of buttons) {
		button.addEventListener("click", function () {
			process_input(this);
		});
	}
}

if (document.readyState !== "loading") {
	onReady();
} else {
	document.addEventListener("DOMContentLoaded", onReady());
}

// screen

function update_screen(value = display) {
	if (value == "") {
		value = "0";
	}

	display = String(value);

	document.querySelector("#calculator #screen").innerHTML = display;
}

function update_calculation(value) {
	previous_calculation = calculation;
	calculation = value;
	update_screen(calculation);
}

function save_display_val() {
	let number = Number(display);

	if (number) {
		update_calculation(number);
		update_screen(0);
	} else {
		update_screen(NaN);
	}

	return number;
}

// functions

function delete_char() {
	display = display.slice(0, -1);
	update_screen();
}

function change_sign() {
	let number = Number(display);

	if (number) {
		calculation = -number;
		update_screen(calculation);
	}
}

// buttons

function process_input(el) {
	let value = el.innerHTML;

	switch (el.className) {
		case "number":
			handle_number_in(value);
			break;
		case "function":
			handle_func(value);
			break;
		case "operation":
			handle_operations(value);
			break;
		case "equal":
			handle_equal();
			break;
	}
}

function handle_number_in(number) {
	if (number == "." && display.includes(".")) {
		return;
	}

	if (display == "0" && number != ".") {
		display = "";
	}

	display += number;

	update_screen();
}

function handle_func(func) {
	switch (func) {
		case "AC":
			update_calculation(0);
			break;
		case "DEL":
			delete_char();
			break;
		case "±":
			change_sign();
			break;
	}
}

function handle_operations(operation) {
	if (display == "0") {
		if (operation == "-") {
			handle_number_in(operation);
		}

		return;
	}

	if (save_display_val()) {
		last_op = operation;
	}
}

function handle_equal() {
	if (last_op && last_op !== "=" && save_display_val()) {
		let result = eval(previous_calculation + last_op + calculation);
		last_op = "=";
		update_calculation(result);
	}
}
