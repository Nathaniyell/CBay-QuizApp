// Set the API URL to fetch the questions from
const apiUrl = "https://opentdb.com/api.php?amount=10&category=21";

// Initialize variables
let shuffledData = [];
let currentQuestionIndex = 0;
let correctAnswers = [];
let score = 0;

// Get the required elements from the HTML document
const questionContainer = document.querySelector(".question-container");
const numberElement = questionContainer.querySelector(".number");
const questionElement = questionContainer.querySelector(".question");
const buttonDiv = questionContainer.querySelector(".button-div");
const nextButton = questionContainer.querySelector(".next-button");
const restartButton = questionContainer.querySelector(".restart-button");

// Function to fetch questions from the API
function fetchQuestions() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Shuffle the received questions
      shuffledData = shuffle(data.results);
      // Extract the correct answers from the shuffled questions
      correctAnswers = shuffledData.map((question) => question.correct_answer);
      // Show the first question
      showQuestion();
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
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
// Function to display a question
function showQuestion() {
  const currentQuestion = shuffledData[currentQuestionIndex];
  numberElement.textContent = currentQuestionIndex + 1;
  questionElement.textContent = currentQuestion.question;
  buttonDiv.innerHTML = "";

  // Combine incorrect and correct answers, then shuffle them
  const answers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ];
  const shuffledAnswers = shuffle(answers);

  // Create buttons for each shuffled answer
  shuffledAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    buttonDiv.appendChild(button);
    button.addEventListener("click", () => {
      handleAnswer(answer);
    });
  });

  // Hide the next button and restart button
  nextButton.style.display = "none";
  restartButton.style.display = "none";
}
// Function to handle a user's answer
function handleAnswer(selectedAnswer) {
  const isCorrectAnswer = correctAnswers.includes(selectedAnswer);

  // Increase the score and add CSS class based on correctness
  if (isCorrectAnswer) {
    score++;
    questionContainer.classList.add("correct");
  } else {
    questionContainer.classList.add("wrong");
  }
  // Disable all answer buttons
  const buttons = buttonDiv.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
  });

  // Show the next button
  nextButton.style.display = "inline-block";
}
// Function to move to the next question
function nextQuestion() {
  // Remove correctness CSS class
  questionContainer.classList.remove("correct", "wrong");

  // Move to the next question or show the result if no more questions
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledData.length) {
    showQuestion();
  } else {
    showResult();
  }
}
