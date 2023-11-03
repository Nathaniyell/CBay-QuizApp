// Set the API URL to fetch the questions from
const apiUrl = 'https://opentdb.com/api.php?amount=10&category=21';

// Initialize variables
let shuffledData = [];
let currentQuestionIndex = 0;
let correctAnswers = [];
let score = 0;

// Get the required elements from the HTML document
const questionContainer = document.querySelector('.question-container');
const numberElement = questionContainer.querySelector('.number');
const questionElement = questionContainer.querySelector('.question');
const buttonDiv = questionContainer.querySelector('.button-div');
const nextButton = questionContainer.querySelector('.next-button');
const restartButton = questionContainer.querySelector('.restart-button');

// Function to fetch questions from the API
function fetchQuestions() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Shuffle the received questions
      shuffledData = shuffle(data.results);
      // Extract the correct answers from the shuffled questions
      correctAnswers = shuffledData.map(question => question.correct_answer);
      // Show the first question
      showQuestion();
    })
    .catch(error => {
      console.error('Error fetching questions:', error);
    });
}

// Function to shuffle an array
function shuffle(array) {
  const shuffledArray = [];

  while (array.length > 0) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array.splice(randomIndex, 1)[0];
    shuffledArray.push(randomElement);
  }

  return shuffledArray;
}