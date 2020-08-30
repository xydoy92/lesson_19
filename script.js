const noDisplay = "nodisplay";

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

signUpButton.addEventListener("click", function () {
	fogging.classList.remove(noDisplay);
	signUpWindow.classList.remove(noDisplay);
});

signInButton.addEventListener("click", function () {
	fogging.classList.remove(noDisplay);
	signInWindow.classList.remove(noDisplay);
});

cancelButtons.forEach(function (item) {
	item.addEventListener("click", function () {
		fogging.classList.add(noDisplay);
		item.parentElement.classList.add(noDisplay);
		item.parentElement.firstElementChild.reset();
		item.previousElementSibling.classList.add("hidden");
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
		if (user[data] === "") {
			warningIfEmptyInput.classList.remove("hidden");
			return;
		}
	}
	warningIfEmptyInput.classList.add("hidden");

	users.push(user);
	document.forms["sign-up"].reset();
	fogging.classList.add(noDisplay);
	signUpWindow.classList.add(noDisplay);
	alert("Регистрация успешна!");
});

comeInButton.addEventListener("click", function () {
	login = document.forms["sign-in"].elements.login.value;
	password = document.forms["sign-in"].elements.password.value;
	for (let key of users) {
		if (login === key.login) {
			if (password === key.password) {
				let userLogin = document.createElement("p");
				userLogin.append(`Логин: ${key.login}`);
				let userAge = document.createElement("p");
				userAge.append(`Возраст: ${key.age}`);
				let userName = document.createElement("p");
				userName.append(`Имя: ${key.name}`);
				userInfo.append(userLogin, userName, userAge);
				signUpButton.classList.add(noDisplay);
				userInfo.classList.remove(noDisplay);
				signInButton.classList.add(noDisplay);
				signOutButton.classList.remove(noDisplay);
				fogging.classList.add(noDisplay);
				signInWindow.classList.add(noDisplay);
				document.forms["sign-in"].reset();
				return;
			} else {
				warningSignIn.innerHTML = "<em>!</em> Неверный пароль";
				warningSignIn.classList.remove("hidden");
				return;
			}
		}
	}
	warningSignIn.innerHTML = "<em>!</em> Такого пользователя нет";
	warningSignIn.classList.remove("hidden");
});

signOutButton.addEventListener("click", function () {
	signUpButton.classList.remove(noDisplay);
	userInfo.classList.add(noDisplay);
	signInButton.classList.remove(noDisplay);
	signOutButton.classList.add(noDisplay);
});