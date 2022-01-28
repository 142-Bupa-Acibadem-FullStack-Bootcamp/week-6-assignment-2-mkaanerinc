const x = "x";
const circle = "circle";

// kazanma ihtimalleri
const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// data-cell ile belirtilen hücreleri alır.
const items = document.querySelectorAll("[data-cell]");
const winningMessage = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;

startGame();

// Line 18'de id ile alınan butona tıklandığında oyun tekrardan başlatılır.
restartButton.addEventListener("click", startGame);

function startGame() {
  // ilk olarak 'X' ile başlanması için circleTurn false yapılır.
  circleTurn = false;

  items.forEach((cell) => {
    // Oyun restart ile başlatılırsa önceki oyundan kalan 'X' ve 'O' ları siler.
    cell.classList.remove(x);
    cell.classList.remove(circle);
    cell.removeEventListener("click", handleClick);

    // Hücrelere tıklandığında handleClick fonksiyonuna geçer.
    // Once true ile bir hücreye bir kez tıklanması sağlanır.
    cell.addEventListener("click", handleClick, { once: true });
  });
  // Show classını kaldırarak restart ekranından çıkılır.
  winningMessage.classList.remove("show");
}

function handleClick(e) {
  // Tıklanan hücreyi alır.
  const cell = e.target;
  // Geçerli class true ile 'O' false ise 'X' oynar
  const currentClass = circleTurn ? circle : x;

  // Tıklanılan yere geçerli olan türü koyar.
  placeMark(cell, currentClass);

  // checkWin veya isDraw true dönerse endGame geçer.
  // Diğer türlü sıra değiştirir.
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

// Fonksiyona gelen değer true ise berabere biter.
// circleTurn true ise 'O' false ise 'X' kazanır.
function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = "Berabere";
  } else {
    winningMessageText.innerText = `${circleTurn ? "O" : "X"} kazandı!`;
  }
  // Show classı ekleyerek restart ekranını gösterir.
  winningMessage.classList.add("show");
}

// her hücre 'X' veya 'O' içeriyorsa berabere içermiyorsa oyun devam eder.
function isDraw() {
  return [...items].every((cell) => {
    return cell.classList.contains(x) || cell.classList.contains(circle);
  });
}

// Belirtilen hücreler 'X' veya 'O' ekler.
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

//Eğer combination da belirtilen diziler ile items da belirtilen classların indexlerini karşılaştırır
// eşleşirse true döner.
function checkWin(currentClass) {
  return combinations.some((combination) => {
    return combination.every((index) => {
      return items[index].classList.contains(currentClass);
    });
  });
}
