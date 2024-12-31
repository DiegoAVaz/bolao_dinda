const betsList = document.getElementById("bets-list");
const searchInput = document.getElementById("search-input");

const bets = [
  [12, 13, 22, 26, 35, 50],
  [5, 22, 36, 38, 41, 55],
  [14, 15, 35, 45, 47, 52],
  [7, 14, 18, 19, 45, 48],
  [3, 7, 42, 43, 46, 48],
  [5, 6, 8, 12, 27, 42],
  [22, 29, 39, 47, 50, 55],
  [10, 20, 41, 48, 55, 56],
  [10, 12, 32, 33, 45, 47],
  [2, 5, 11, 21, 48, 59],
];

const uniqueBets = Array.from(new Set(bets.map(JSON.stringify))).map(
  JSON.parse
);

function renderBets(sortedBets, highlightedNumbers) {
  betsList.innerHTML = "";
  sortedBets.forEach(({ bet, matches }) => {
    const betItem = document.createElement("li");
    betItem.innerHTML = bet
      .map((num) =>
        highlightedNumbers.has(num)
          ? `<span style="color: #00c853;">${num}</span>`
          : `<span style="color:rgb(249, 114, 114);">${num}</span>`
      )
      .join(" ");
    betItem.setAttribute("data-matches", matches);
    betsList.appendChild(betItem);
  });
}

function filterAndSortBets() {
  const inputNumbers = searchInput.value
    .split(" ")
    .map(Number)
    .filter((n) => !isNaN(n));
  const highlightedNumbers = new Set(inputNumbers);

  const sortedBets = uniqueBets
    .map((bet) => {
      const matches = bet.filter((num) => highlightedNumbers.has(num)).length;
      return { bet, matches };
    })
    .sort((a, b) => b.matches - a.matches);

  renderBets(sortedBets, highlightedNumbers);
}

searchInput.addEventListener("input", filterAndSortBets);

renderBets(
  uniqueBets.map((bet) => ({ bet, matches: 0 })),
  new Set()
);
