// Set the API URL to fetch the questions from
const apiUrl = 'https://opentdb.com/api.php?amount=20&category=21';

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