const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
let activeSlideIndex = 0;
const container = document.querySelector('.container');

/*
	Цвет sidebar в коде index.html зеркально отражён относительно дивов
 	с картинками. Чтобы их совместить мы ниже высчитываем на сколько экранов
	нужно сдвинуть sidebar.
*/
// Создаём переменную для изменения селектора top в sidebar
const sidebar = document.querySelector('.sidebar');
// Создаём переменную для подсчёта количества слайдов
const mainSlide = document.querySelector('.main-slide');
// Считаем количество слайдов по количеству дивов в sidebar
const slideCoutn = mainSlide.querySelectorAll('div').length;
// Вычитаем единицу, т.к. один слайд уже выведен на экран
sidebar.style.top = `-${(slideCoutn - 1) * 100}vh`;


// Считываем нажание на клавишы слайдера мышью
upBtn.addEventListener('click', () => {
	changeSlide('up');
});

downBtn.addEventListener('click', () => {
	changeSlide('down');
});

// Считываем нажатие на клавиши вверх-вниз на клавиатуре
document.addEventListener('keydown', event => {
	if (event.key === 'ArrowUp') {
		changeSlide('up');
	} else if (event.key === 'ArrowDown') {
		changeSlide('down');
	}
})

// Функция смены слайда
function changeSlide(direction) {
	if (direction === 'up') {
		activeSlideIndex++;
		if (activeSlideIndex === slideCoutn) {
			activeSlideIndex = 0;
		}
	} else if (direction === 'down') {
		activeSlideIndex--;
		if (activeSlideIndex < 0) {
			activeSlideIndex = slideCoutn - 1;
		}
	}

	// Переменная с размером экрана пользователя
	const height = container.clientHeight;

	// Анимация слайда по вертикали
	mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;

	// Анимация сайдбара d противоположную сторону по вертикали
	sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;

}


