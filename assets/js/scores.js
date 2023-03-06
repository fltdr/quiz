let results = JSON.parse(localStorage.getItem("highscores")) || [];

if (!results.length) {
  console.log('No scores....'); //Do something if there are no scores
} else {
  for (let i = 0; i < results.length; i++) {
    let result = document.createElement("li");
    result.textContent = results[i].initials + " " + results[i].score;
    document.getElementById("highscores").appendChild(result);
  }
}

document.getElementById("clear").addEventListener("click", function () {
  localStorage.clear();
  document.getElementById("highscores").innerHTML = "";
});