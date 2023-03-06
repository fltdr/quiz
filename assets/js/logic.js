let totalTime = 30; // Run quiz for n seconds
let penaltyTime = 10; // Penalty for wrong answers
let timerID;
let feedbackID;
let score = 0;
let questionIndex = 0;
let totalQuestions = questions.length;

const timeEl = document.getElementById("time"); //Remember element time, we'll need to update it later

timeEl.textContent = totalTime;
document.querySelector(".timer").classList.remove("hide"); // Display total time in page and show the element.

document.getElementById("start").addEventListener("click", startQuiz);

function startQuiz() {
  if (!totalQuestions) {
    alert("No questions, we can't start the quiz");
    return; //Stop if the questions are not found...
  }
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");
  timerID = setInterval(function () {
    totalTime--;
    if (totalTime > 0) {
      timeEl.textContent = totalTime; //Update timer in the page
    } else {
      endQuiz();
    }
  }, 1000);
  displayQuestion();
}

let choicesEl = document.getElementById("choices");

function displayQuestion() {
  let question = questions[questionIndex];
  console.log(question);
  document.getElementById("question-title").textContent = question.title;
  choicesEl.innerHTML = "";
  for (let i = 0; i < question.choices.length; i++) {
    let button = document.createElement("button");
    button.textContent = question.choices[i];
    choicesEl.appendChild(button);
    button.addEventListener("click", function () {
      if (i == (question.answer - 1)) { //Right choice
        score += 10;
        giveFeedback("Right Choice, your score is: " + score);
      } else { //Wrong choice
        giveFeedback("Wrong Choice");
        totalTime -= 10;
      }
      questionIndex++;
      if (questionIndex == totalQuestions) {
        endQuiz();
      } else {
        displayQuestion();
      }
    });
  }
}

function giveFeedback(feedbackText) {
  feedbackID = clearTimeout(feedbackID);
  feedback.textContent = feedbackText
  feedback.classList.remove("hide");
  feedbackID = setTimeout(function () {
    feedback.classList.add("hide");
  }, 2000);
}

function endQuiz() {
  giveFeedback("Quiz is over.");
  timerID = clearInterval(timerID);
  timeEl.textContent = 0;
  document.getElementById("questions").classList.add("hide");
  document.getElementById("end-screen").classList.remove("hide");
  document.getElementById("final-score").textContent = score;
  document.getElementById("submit").addEventListener('click', function () {
    let initials = document.getElementById("initials").value;
    if (!initials.length) {
      giveFeedback("Please enter initials to save score.");
    } else {
      let results = JSON.parse(localStorage.getItem("highscores")) || [];
      console.log(results);
      //Save data to localStorage
      let result = {
        initials: initials,
        score: score
      };
      results.push(result);
      console.log(results);
      localStorage.setItem("highscores", JSON.stringify(results));
      location.href = "highscores.html";
    }
  });
}