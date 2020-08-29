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
	fogging.classList.remove("nodisplay");
	signUpWindow.classList.remove("nodisplay");
});

signInButton.addEventListener("click", function () {
	fogging.classList.remove("nodisplay");
	signInWindow.classList.remove("nodisplay");
});

cancelButtons.forEach(function (item) {
	item.addEventListener("click", function () {
		fogging.classList.add("nodisplay");
		item.parentNode.classList.add("nodisplay");
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
	fogging.classList.add("nodisplay");
	signUpWindow.classList.add("nodisplay");
});

comeInButton.addEventListener("click", function () {
	login = document.forms["sign-in"].elements.login.value;
	password = document.forms["sign-in"].elements.password.value;
	for (let key of users) {
		if (login === key.login) {
			if (password === key.password) {
				let pLogin = document.createElement("p");
				pLogin.append(`Логин: ${key.login}`);
				let pAge = document.createElement("p");
				pAge.append(`Возраст: ${key.age}`);
				let pName = document.createElement("p");
				pName.append(`Имя: ${key.name}`);
				userInfo.append(pLogin, pName, pAge);
				signUpButton.classList.add("nodisplay");
				userInfo.classList.remove("nodisplay");
				signInButton.classList.add("nodisplay");
				signOutButton.classList.remove("nodisplay");
				fogging.classList.add("nodisplay");
				signInWindow.classList.add("nodisplay");
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
	signUpButton.classList.remove("nodisplay");
	userInfo.classList.add("nodisplay");
	signInButton.classList.remove("nodisplay");
	signOutButton.classList.add("nodisplay");
});