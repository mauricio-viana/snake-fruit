const modal = document.getElementById('modal');
const restart = document.getElementById('restart');

function recordScore(newRecordScore) {
  modal.classList.toggle('hide');

  console.log(newRecordScore);
}

function saveRecordScore() {
  modal.classList.toggle('hide');
}

restart.addEventListener('click', saveRecordScore);
