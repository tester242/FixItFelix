const startButton = document.getElementById('start');
const quiz = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const infoElement = document.getElementById('info');
const choices = document.getElementById('choices');
const nextButton = document.getElementById('next');
const nextDiv = document.getElementById('nextDiv');
const pageElements = document.querySelectorAll("#page *");
const progress = document.getElementById("progressBar");   
const main = document.getElementById('main');

/*this function is from
https://codepen.io/GariCarandai/pen/LYrbyPb*/
$(document).ready(function(){
  
  var textBox = $('.text_box');  
  //var chars = ['A','B','C','D', 'E','F','G','H', 'I','J','K','L', 'M','N','O','P', 'Q','R','S','T', 'U','V','W','X', 'Y','Z'];
  var specialCharacters = ['!','§','$','%', '&','/','(',')', '=','?','_','<', '>','^','°','*', '#','-',':',';','~'];
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  var newStringSplit = "";
  var time = 80; //125
  var count = 0, j = 0;
  var delayAnimation = 0;
  
  function startScrambleText(){
  
    stringSplit = textBox.text().split('');
    textBox.css({
      'width': stringSplit.length + 'ch',
      'animation': 'typing '+ ((time * stringSplit.length) / 1000) +'s steps('+ stringSplit.length +')'
    });
    
    var interval = setInterval(function(){
      
      newStringSplit = "";

      for(i = 0; i <= stringSplit.length-1; i++){

        if(i <= j && count >= stringSplit.length+delayAnimation){
          newStringSplit += stringSplit[i];
        }else{
          newStringSplit += specialCharacters[random(0, specialCharacters.length-1)];
        }


      }
      textBox.text(newStringSplit);
      count++;
      if(count >= stringSplit.length+delayAnimation){
        j++;
        if(j >= stringSplit.length){ clearInterval(interval); }
      }
      
    }, time);
  };
  
  startScrambleText();
  
});

/* Our code Here */

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
    main.style.color="#000000";
    main.style.backgroundColor="#ffffff";
    index = 0;
    width = 0;
    progress.style.width = 0;
    progress.classList.remove('hidden');
    pageElements.forEach(element => {
      if(element.tagName == 'DIV'){
        element.classList.add('hidden');
      }
    });
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

    if(index==1){
      main.style.color="#141c2c";
      main.style.backgroundColor="#f6d1ba";
    }
    if(index==3){
      let reveal = document.getElementById(`question${index-1}`);
      reveal.classList.add('hidden');
    }
    infoElement.innerText = questionsArray[index].explanation;
    let reveal = document.getElementById(`question${index}`);
    console.log(reveal);
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
        info: 'We read from left to right and top to bottom. Therefore, key information is placed in this area users will generally direct their attention to it first.',
        question: 'Where should the name be?',
        answers: [
            {text: 'Top', correct: true},
            {text: 'Middle', correct: false},
            {text: 'Bottom', correct: false}
        ],
        explanation: 'Correct! The top left is where the user will first focus their eyes on so that is the perfect place to display the name.'
    },
    {
        info: 'It is important that a UI employs colors that are contrasting to one another, makeing it far more readable for the user. Remember to keep in mind readability for the color blind as well.',
        question: 'What colors should we use for the background and text?',
        answers: [
            {text: 'White and Yellow', correct: false},
            {text: 'Dark Green and Brown', correct: false},
            {text: 'Cream and Navy', correct: true}
        ],
        explanation: 'These color are neutral and have excellent contrast making them very readibile whether you\'re colorblind or not.'
    },
    {
        info: 'On a landing page, UI developers should aim to provide the information most users are coming to the website for.',
        question: 'What should be on the landing page?',
        answers: [
            {text: 'The menu', correct: true},
            {text: 'Reviews', correct: false},
            {text: 'Log-in Page', correct: false}
        ],
        explanation: 'The third law of simplicity is time. Most users are coming to a website to see the menu, so save their time and show it to them directly. '
    },
    {
        info: 'Now that we wish to present a menu, it is important to do so in a way that is clear and effecient for the user. This uses another law of simplicity: law two, organize.',
        question: 'How should we present the menu options',
        answers: [
            {text: 'Show them all', correct: false},
            {text: 'Split them into categories', correct: true},
            {text: 'Sort them on price', correct: false}
        ],
        explanation: 'The user doesnt need to see every option as they likely already have an idea on what type of food they want. Categories allow them to quickly naviagte.'
    },
    {
        info: 'Important aspects of a page should be made bigger and more apparent for the user. ',
        question: "Which element should have the user's attention be directed to the most?",
        answers: [
            {text: 'Logo', correct: false},
            {text: 'Checkout button', correct: true},
            {text: 'History of the store', correct: false}
        ],
        explanation: 'The checkout button is what the user will most frequently use so it is best the make it the largest and at the top of the screen.'
    },
    {
      info: 'The footer of a website typically contains useful, but not critical, information about the page. It is easy for users to find this information by glancing at the bottom of the page.',
      question: "What should the footer contain?",
      answers: [
          {text: 'Restaurant\'s address and phone number', correct: true},
          {text: 'Developer\'s contact info', correct: false},
          {text: 'Similar resturant\'s websites', correct: false}
      ],
      explanation: 'This answer provides information that many users would look for regarding a coffee shop so it is the most important from these options to include in the footer.'
  },
  {
    info: 'Error messages should provide clear and useful explanations of what went wrong and why. This allows the user to easily understand the problem and can improve the user experience.',
    question: "What should an ideal error message for ordering outside of open hours look like?",
    answers: [
        {text: 'Error', correct: false},
        {text: 'Error: You can\'t order outside of operating hours', correct: true},
        {text: 'Error: There was a problem with your order, please try again', correct: false}
    ],
    explanation: 'This choice is correct because it is clearly letting the user know why the error is occuring is. The other options are too imprecise and do not have constructive solutions'
},
    {
      info: 'The finished result',
      question: "Fantastic!",
      answers: [

      ],
      explanation: ''
    }
]


