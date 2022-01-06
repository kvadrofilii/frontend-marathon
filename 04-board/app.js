const board = document.querySelector('#board');
//- Массив из цветов для закрашивания
const colors = ['#116644', '#559977', '#ffeeff', '#ffccdd', '#eeaaaa'];
//- Задаём количество квадратиков на доске
const SQUARES_NUMBER = 500;

//- Создание доски из квадратиков
for (let i = 0; i < SQUARES_NUMBER; i++) {
	const square = document.createElement('div');
	square.classList.add('square');

	square.addEventListener('mouseover', () => setColor(square));

	square.addEventListener('mouseleave', () => removeColor(square));

	board.append(square);
}

//- Функция закраски квадратика
function setColor(element) {
	const color = getRandomColor();
	element.style.backgroundColor = color;
	element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

//- Функция очиски квадратика
function removeColor(element) {
	element.style.backgroundColor = '#1d1d1d';
	element.style.boxShadow = '0 0 2px #000';
}

//- Получаем рандомный цвет из массива colors
function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}