const noDisplay = "nodisplay";
const hiddenVisibility = "hidden";
let users = [
	{ login: "Meow", password: "123456", name: "Аня", age: 23, },
	{ login: "Waw", password: "1234", name: "Саша", age: 14, },
	{ login: "Coo-coo", password: "1111abcd", name: "Андрей", age: 35, },
	{ login: "gaga84", password: "abcdefgh", name: "Артём", age: 40, },
];

let signUpButton = document.querySelector(".sign-up");
let userInfo = document.querySelector(".userinfo");
let signInButton = document.querySelector(".sign-in");
let signOutButton = document.querySelector(".sign-out");

let fogging = document.querySelector(".fogging");
let cancelButtons = document.querySelectorAll(".cancel");
let submitSignUpButton = document.querySelector(".submit");
let comeInButton = document.querySelector(".comein");
let warningIfEmptyInput = document.querySelector(".warning-empty");
let warningSignIn = document.querySelector(".warning-sign-in");
let signUpWindow = document.querySelector(".sign-up-window");
let signInWindow = document.querySelector(".sign-in-window");

function hideElements(hideKind, ...elements) {
	for(let element of elements) {
		element.classList.add(hideKind);
	}
}

function showElements(hideKind, ...elements) {
	for(let element of elements) {
		element.classList.remove(hideKind);
	}
}

signUpButton.addEventListener("click", function() {
	showElements(noDisplay, fogging, signUpWindow);
});

signInButton.addEventListener("click", function() {
	showElements(noDisplay, fogging, signInWindow);
});

cancelButtons.forEach(function (item) {
	item.addEventListener("click", function () {
		hideElements(noDisplay, fogging, item.parentElement);
		hideElements(hiddenVisibility, item.previousElementSibling);
		item.parentElement.firstElementChild.reset();
	});
});

submitSignUpButton.addEventListener("click", function () {
	let login = document.forms["sign-up"].elements.login.value;
	let password = document.forms["sign-up"].elements.password.value;
	let name = document.forms["sign-up"].elements.name.value;
	let age = document.forms["sign-up"].elements.age.value;

	let user = {
		login,
		password,
		name,
		age,
	};

	for (let data in user) {
		if(user[data] === "") {
			showElements(hiddenVisibility, warningIfEmptyInput);
			return;
		}
	}
	hideElements(hiddenVisibility, warningIfEmptyInput);
	users.push(user);
	document.forms["sign-up"].reset();
	hideElements(noDisplay, fogging, signUpWindow);
	alert("Регистрация успешна!");
});

comeInButton.addEventListener("click", function () {
	login = document.forms["sign-in"].elements.login.value;
	password = document.forms["sign-in"].elements.password.value;
	let currentUser = users.find(user => user.login === login);
	if(login === "" || password === "") {
		showElements(hiddenVisibility, warningSignIn);
		return;
	} else if(currentUser === undefined) {
		warningSignIn.innerHTML = "<em>!</em> Такого пользователя нет";
		showElements(hiddenVisibility, warningSignIn);
		return;
	} else if(currentUser.password !== password) {
		warningSignIn.innerHTML = "<em>!</em> Неверный пароль";
		showElements(hiddenVisibility, warningSignIn);
		return;
	} else {
		let userLogin = document.createElement("p");
		userLogin.append(`Логин: ${currentUser.login}`);
		let userAge = document.createElement("p");
		userAge.append(`Возраст: ${currentUser.age}`);
		let userName = document.createElement("p");
		userName.append(`Имя: ${currentUser.name}`);
		userInfo.append(userLogin, userName, userAge);
		showElements(noDisplay, userInfo, signOutButton);
		hideElements(noDisplay, signUpButton, signInButton, fogging, signInWindow);
		document.forms["sign-in"].reset();
		return;
	}
});

signOutButton.addEventListener("click", function () {
	hideElements(noDisplay, userInfo, signOutButton);
	showElements(noDisplay, signUpButton, signInButton);
});