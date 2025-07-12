$(function() {
    const $car = $('#car');
    const $ob = $('#obstacle');
    const $game = $('#game-container');
    let gameSpeed = 5, score = 0, over = false, obstacleTimer;
  
    // Key controls
    $(document).on('keydown', e => {
      let x = $car.position().left;
      if (e.key === 'ArrowLeft' && x > 0) $car.css('left', x - 100);
      if (e.key === 'ArrowRight' && x < $game.width() - $car.width()) $car.css('left', x + gameSpeed);
    });
  
    function moveObstacle() {
      let top = $ob.position().top + gameSpeed;
      if (top > $game.height()) {
        $ob.css({ top: '-50px', left: Math.random() * ($game.width() - $ob.width()) });
        score++;
        gameSpeed += 0.2;
        $('#score').text(`Score: ${score}`);
      } else {
        $ob.css('top', top);
        checkCollision();
      }
      if (!over) requestAnimationFrame(moveObstacle);
    }
  
    function checkCollision() {
      const c = $car[0].getBoundingClientRect();
      const o = $ob[0].getBoundingClientRect();
      if (!(c.right < o.left || c.left > o.right || c.bottom < o.top || c.top > o.bottom)) {
        over = true;
        alert(`Game Over! Score: ${score}`);
      }
    }
  
    // Start
    $ob.css('left', Math.random() * ($game.width() - $ob.width()));
    moveObstacle();
  });
  