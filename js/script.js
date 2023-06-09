'use strict'
window.addEventListener('DOMContentLoaded', () => {

	const questions = [
		{
			question: "Як мене звати?",
			answers: ["Віктор", "Ахілес", "Віталік", "Захар"],
			correct: 4,
		},
		{
			question: "Ким я мріяв стати у дитинстві?",
			answers: [
				"Королем Піратів",
				"Людиною-павуком",
				"Самураєм",
				"Водієм",
			],
			correct: 1,
		},
		{
			question: "Як звати мого батька?",
			answers: [
				"WARHAMMER TOTAL WAR",
				"Abyssal Blade",
				"Валера",
				"Mercedes-Benz",
			],
			correct: 3,
		},
		{
			question: "На кого я вчусь?",
			answers: [
				"На Пілота",
				"На Кіберспортсмена",
				"На Программіста",
				"На Mercedes-Benz",
			],
			correct: 4,
		},
	];


	const headerContainer = document.querySelector('#header'),
		listContainer = document.querySelector('#list'),
		buttonSubmit = document.querySelector('#submit')
	let score = 0;
	let questionIndex = 0;

	clearElement(headerContainer);
	clearElement(listContainer);


	showQuestion(headerContainer);
	showAnswers(listContainer);

	buttonSubmit.addEventListener('click', checkAnswer);

	function clearElement(element) {
		element.innerHTML = ' ';
	}

	function showQuestion(container) {
		//Заголовок с вопросом
		const headerWrapper = `<h2 class="title">%title%</h2>`;
		// container.innerHTML = headerWrapper

		const title = headerWrapper.replace('%title%', questions[questionIndex]['question']);
		container.innerHTML = title;
	}

	function showAnswers(container) {
		//Варианты ответов

		for (let answerText of questions[questionIndex]['answers']) {

			const answerWrapper =
				`<li>
					<label>
						<input type="radio" class="answer" name="answer" />
						<span>%answer%</span>
					</label>
				</li>`;

			const answerHTML = answerWrapper.replace("%answer%", answerText);
			container.innerHTML += answerHTML
		}
	}

	function checkAnswer() {

		const answers = document.querySelectorAll('.answer');
		let checkedAnswer,
			numberOfAnswer;

		answers.forEach((element, index) => {
			if (element.checked == true) {
				checkedAnswer = element;
				numberOfAnswer = index + 1;

			}
		})

		if (!checkedAnswer) {
			buttonSubmit.blur();
			return;
		}

		if (numberOfAnswer == questions[questionIndex]['correct']) {
			buttonSubmit.blur();
			score++;
		}

		checkLastQuestion()
	}

	function checkLastQuestion() {
		if (questionIndex !== questions.length - 1) {
			questionIndex++;
			clearElement(headerContainer);
			clearElement(listContainer);

			showQuestion(headerContainer);
			showAnswers(listContainer);
			return;
		} else {
			clearElement(headerContainer);
			clearElement(listContainer);
			showResults();
		}
	}

	function showResults() {
		buttonSubmit.blur();

		const resultsWrapper = 
		`<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p`;

		let title, message;

		if(score == questions.length) {
			title = 'Поздрявляю';
			message = 'Молодец, ты прошел тест идеально.'
		}else if(score * 100 / questions.length >= 50) {
			title = 'Неплохой результат! Но вася из 9-Б набрал больше'
			message = 'Считай у тебя твердая середина, но я думаю ты можешь и лучше'
		}else {
			title = 'Ты обкурился?'
			message = 'У тебя плохой результат, меньше среденего, повтори материал и сдай лучше';
		}

		const result = `${score} из ${questions.length}`;

		const finalWrapper = resultsWrapper
		              						.replace('%title%', title)
											.replace('%message%', message)
											.replace('%result%', result);
		headerContainer.innerHTML = finalWrapper;

		buttonSubmit.textContent = 'Играть снова';
		buttonSubmit.onclick = () => history.go()
	}

});

