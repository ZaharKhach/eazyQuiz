'use strict'
window.addEventListener('DOMContentLoaded', () => {

	const questions = [
		{
			question: "Какой язык работает в браузере?",
			answers: ["Java", "C", "Python", "JavaScript"],
			correct: 4,
		},
		{
			question: "Что означает CSS?",
			answers: [
				"Central Style Sheets",
				"Cascading Style Sheets",
				"Cascading Simple Sheets",
				"Cars SUVs Sailboats",
			],
			correct: 2,
		},
		{
			question: "Что означает HTML?",
			answers: [
				"Hypertext Markup Language",
				"Hypertext Markdown Language",
				"Hyperloop Machine Language",
				"Helicopters Terminals Motorboats Lamborginis",
			],
			correct: 1,
		},
		{
			question: "В каком году был создан JavaScript?",
			answers: ["1996", "1995", "1994", "все ответы неверные"],
			correct: 2,
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

