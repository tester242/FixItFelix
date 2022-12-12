const startButton = document.getElementById('start');
const quiz = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const infoElement = document.getElementById('info');
const choices = document.getElementById('choices');
const nextButton = document.getElementById('next');
const pageElements = document.querySelectorAll("#page *");
const progress = document.getElementById("progressBar");   


let index = 0;
let width = 0;

function update() {
  width = ((index+1)/questionsArray.length) * 100;
  progress.style.width = width +  '%';
}


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    index++;
    update();
    nextQuestion();
  })

function startGame() {
    let reveal = document.getElementById(`intro`);
    reveal.classList.add('hidden');
    index = 0;
    width = 0;
    progress.style.width = 0;
    pageElements.forEach(element => element.classList.add('hidden'));
    startButton.classList.add('hidden');
    quiz.classList.remove('hidden');
    nextQuestion();
}

function nextQuestion() {
    resetState();
    showQuestion(questionsArray[index]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    infoElement.innerText = question.info;
    if (index == questionsArray.length-1) {
      startButton.innerText = 'Restart';
      startButton.classList.remove('hidden');
    }
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
          button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        choices.appendChild(button);
      })
}

function resetState() {
    nextButton.classList.add('hidden');
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
}
  

function selectAnswer(e) {
  const selectedButton = e.target;
  setStatusClass(selectedButton, selectedButton.dataset.correct);
  if (selectedButton.dataset.correct) {
      infoElement.innerText = questionsArray[index].explanation;
      let reveal = document.getElementById(`question${index+1}`);
      reveal.classList.remove('hidden');
      nextButton.classList.remove('hidden');
  }
}
  
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}
  
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}



questionsArray = [
    {
        info: 'We read from left to right and top to bottom. Therefore most key information is placed in this area since that is where the user will see it first',
        question: 'Where should the name be?',
        answers: [
            {text: 'Top', correct: true},
            {text: 'Middle', correct: false},
            {text: 'Bottom', correct: false}
        ],
        explanation: 'Correct! The top left is where the user will first focus their eyes on so that is the perfect place to display the name.'
    },
    {
        info: 'important info that will help you answer this question here',
        question: 'Which interaction styles should you implement?',
        answers: [
            {text: 'Direct manipulation', correct: false},
            {text: 'Command Language', correct: false},
            {text: 'Menu Selection', correct: true}
        ],
        explanation: 'Yes, the correct answer is menu selection; direction manipulation would be cumbersome on computing resources and might excluded.'
    },
    {
        info: 'info here',
        question: 'What should be on the landing page?',
        answers: [
            {text: 'The menu', correct: true},
            {text: 'Reviews', correct: false},
            {text: 'Log-in Page', correct: false}
        ],
        explanation: 'Most users will just want to see the menu so save their time and show it to them directly.'
    },
    {
        info: 'info here',
        question: 'How should we present the menu options',
        answers: [
            {text: 'Show them all', correct: false},
            {text: 'Split them into categories', correct: true},
            {text: 'Sort them on price', correct: false}
        ],
        explanation: 'The user doesnt need to see every option as they likely already have an idea on what type of food they want, allow them to select a desired category instead.'
    },
    {
        info: 'info here',
        question: "To where and how should we direct the user's attention",
        answers: [
            {text: 'Add to cart button', correct: false},
            {text: 'Checkout button', correct: true},
            {text: 'Deals, discounts', correct: false}
        ],
        explanation: 'explanation here'
    },
    {
      info: 'The finished result',
      question: "Fantastic!",
      answers: [

      ],
      explanation: ''
    }
]