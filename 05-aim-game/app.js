//- Получаем DOM-элемент с id "start"
const startBtn = document.querySelector('#start');
//- Получаем все DOM-элементы с классом "screen" в массив screens
const screens = document.querySelectorAll('.screen');
//- Получаем DOM-элемент с id "time-list"
const timeList = document.querySelector('#time-list');
//- Получаем DOM-элемент с id "time"
const timeEl = document.querySelector('#time');
//- Получаем DOM-элемент с id "board"
const board = document.querySelector('#board');
//- Массив из цветов для закрашивания кружка
const colors = ['#116644', '#559977', '#ffeeff', '#ffccdd', '#eeaaaa'];
//- Переменная для считывания выбора времени
let time = 0;
//- Переменная для ведения счёта попадания по кружку
let score = 0;

//- Считываем нажатие кнопки "Начать игру"
startBtn.addEventListener('click', (event) => {
	//- Отменяем поведение по умолчанию (переход по адресу "#")
	event.preventDefault();
	//- Добавляем класс up при нажатии кнопки "Начать игру"
	screens[0].classList.add('up');
});

//- Считываем нажатие кнопок с выбором времени
timeList.addEventListener('click', event => {
	//- Проверяем нажатие кнопокс выбором времени
	if (event.target.classList.contains('time-btn')) {
		//- Записываем в переменную time значение "data-time" от нажатой кнопки
		//- Переводим строковое значение в числовое!
		time = parseInt(event.target.getAttribute('data-time'));
		//- Изменение экрана на третий
		screens[1].classList.add('up');
		//- Вызываем функцию начала игры
		startGame();
	}
});

//- Считываем клики на доске
board.addEventListener('click', event => {
	//- Проверяем попадание по кружку
	if (event.target.classList.contains('circle')) {
		//- Прибавляем 1 к переменной score (ведём счёт попаданий по кружку)
		score++;
		//- Удаляем кружочек с доски
		event.target.remove();
		//- Создаём новый кружочек на доске
		createRandomCircle();
	}
});

//- Функция начала игры
function startGame() {
	//- Вызываем функцию смены времени
	setInterval(decreaseTime, 1000);
	//- Вызываем функцию создания кружка на доске
	createRandomCircle();
	//- Присваеваем элементу с id "time" значение переменной time
	setTime(time);
}

//- Функция смены вревени
function decreaseTime () {
	//- Проверяем что время больше 0
	if (time === 0) {
		//- Вызываем функцию конца игры
		finishGame();
	} else {
		//- Создаём переменную current и присваеваем ей значение переменной
		//- time уменшенное на единицу 
		let current = --time;
		//- Проверяем значение времени, если меньше 10, то добавляем "0"
		//- перед значением переменной current
		if (current < 10) {
			current = `0${current}`;
		}
		//- Присваеваем элементу с id "time" значение переменной current
		setTime(current);
	}
}

function setTime(value) {
	//- Присваеваем элементу с id "time" значение переменной time
	timeEl.innerHTML = `00:${value}`;
}

//- Функция конца игры
function finishGame() {
	//- Прячем наш таймер обращаясь к родителю элемента timeEl (h3)
	timeEl.parentNode.classList.add('hide');
	//- Меняем доску с кружком на доску со счётом игры (создаём новую доску)
	board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;
}

//- Функция создания кружка на доске
function createRandomCircle() {
	//- Создаём константу с элементом div(кружок)
	const circle = document.createElement('div');
	//- Константа с размером кружка и присваеваем ей рандомное значение
	const size = getRandomNumber(10, 60);
	//- Получаем размер доски
	const {width, height} = board.getBoundingClientRect();
	//- Константы для расположения кружка на доске
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);

	//- Добавляем класс circle к элементу div(кружок)
	circle.classList.add('circle');
	//- Задаём размер кружочка
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	//- Задаём расположение кружка на доске
	circle.style.left = `${x}px`;
	circle.style.top = `${y}px`;

	//- Вызываем функцию закраски кружка
	setColor(circle);
	//- Добавляем наш div(кружок) на доску
	board.append(circle);
}

function getRandomNumber(min, max) {
	//- Получаем случайное число в пределах двух чисел и округляем его до целого
	return Math.round(Math.random() * (max - min) + min);
}

//- Функция закраски кружка
function setColor(element) {
	//- Получаем рандомный цвет из массива colors
	const color = getRandomColor();
	//- Присваеваем background-color значение пременной color
	element.style.backgroundColor = color;
}

//- Получаем рандомный цвет из массива colors
function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

