  let score = 0;
  let rounds = 0;
  const totalRounds = 10;
  const green = "#04dd04";
  const red = "#ff0404";
  let activeTimeout = null;
  let currentActiveId = null;

  const scoreElement = document.getElementById("score");

  const balloons = document.querySelectorAll(".balloon");
  balloons.forEach(balloon => {
    balloon.addEventListener("click", (e) => {
      const id = e.target.id;
      if (id === currentActiveId) {
        // Clicked in time
        clearTimeout(activeTimeout);
        score++;
        scoreElement.innerText = `Score: ${score}`;
        e.target.style.backgroundColor = green;
        currentActiveId = null;
      }
    });
  });

  function activateBalloon() {
    if (rounds >= totalRounds) {
      clearInterval(gameInterval);
      alert("Game Over! Final Score: " + score);
      return;
    }

    const randomNumber = Math.floor(Math.random() * 9) + 1;
    const balloon = document.getElementById(randomNumber);

    if (!balloon) return;

    balloon.style.backgroundColor = red;
    currentActiveId = `${randomNumber}`;

    activeTimeout = setTimeout(() => {
      if (balloon) balloon.remove(); // burst
      currentActiveId = null;
    }, 1000);

    rounds++;
  }

  const gameInterval = setInterval(activateBalloon, 2000);