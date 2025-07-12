const $car = document.getElementById('car');
const $ob = document.getElementById('obstacle');
const $game = document.getElementById('game-container');
const $score = document.getElementById('score');
const $highscore = document.getElementById('highscore');
const $restartBtn = document.getElementById('restartBtn');

let speed = 5, score = 0, over = false;
let highScore = +localStorage.getItem('racingHigh') || 0;
$highscore.textContent = `High Score: ${highScore}`;

document.addEventListener('keydown', e => {
  if (over) return;
  let x = $car.offsetLeft;
  if (e.key === 'ArrowLeft' && x > 0) $car.style.left = x - speed + 'px';
  if (e.key === 'ArrowRight' && x < $game.clientWidth - $car.clientWidth)
    $car.style.left = x + speed + 'px';
});

function moveObstacle() {
  let top = $ob.offsetTop + speed;
  if (top > $game.clientHeight) {
    $ob.style.top = '-60px';
    $ob.style.left = Math.random() * ($game.clientWidth - $ob.clientWidth) + 'px';
    score++;
    speed += 0.2;
    $score.textContent = `Score: ${score}`;
  } else {
    $ob.style.top = top + 'px';
    if (collide($car, $ob)) return endGame();
  }
  if (!over) requestAnimationFrame(moveObstacle);
}

function collide(a, b) {
  const A = a.getBoundingClientRect(), B = b.getBoundingClientRect();
  return !(A.right < B.left || A.left > B.right || A.bottom < B.top || A.top > B.bottom);
}

function endGame() {
  over = true;
  $restartBtn.classList.remove('d-none');
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('racingHigh', highScore);
    $highscore.textContent = `High Score: ${highScore}`;
  }
}

$restartBtn.addEventListener('click', () => {
  speed = 5;
  score = 0;
  over = false;
  $score.textContent = `Score: ${score}`;
  $ob.style.top = '-60px';
  $restartBtn.classList.add('d-none');
  requestAnimationFrame(moveObstacle);
});

// initialize
$ob.style.left = Math.random() * ($game.clientWidth - $ob.clientWidth) + 'px';
moveObstacle();
