const modal = document.getElementById('modal');
const inputMaxPoint = document.querySelector('input[name = maxPoint]');
const inputMaxBonus = document.querySelector('input[name = maxBonus]');
const inputMaxDifficulty = document.querySelector(
  'input[name = maxDifficulty]'
);
const inputTotal = document.querySelector('input[name = maxTotal]');

function recordScore({ bonus, difficulty, score }) {
  modal.classList.toggle('hide');

  inputMaxPoint.value = score;
  inputMaxBonus.value = bonus;
  inputMaxDifficulty.value = difficulty;
  inputTotal.value = bonus > 0 ? score * bonus : score;
}

function saveRecordScore() {
  modal.classList.toggle('hide');
}
