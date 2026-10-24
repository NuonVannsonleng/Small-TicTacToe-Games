import { createGame } from './game.js';
const game = createGame();
const scores = { X: 0, O: 0, draw: 0 };
const cells = [...document.querySelectorAll('.cell')];
function render() {
  const board = game.board;
  cells.forEach((cell, index) => {
    const mark = board[index];
    cell.textContent = mark === 'X' ? '×' : mark === 'O' ? '○' : '';
    cell.className = `cell${mark === 'O' ? ' o' : ''}${game.outcome?.line.includes(index) ? ' winner' : ''}`;
    cell.disabled = Boolean(mark || game.outcome);
    cell.setAttribute('aria-label', `Row ${Math.floor(index / 3) + 1}, column ${index % 3 + 1}, ${mark || 'empty'}`);
  });
  document.querySelector('#status').textContent = game.outcome
    ? game.outcome.winner === 'draw' ? 'A draw. Great minds think alike!' : `Player ${game.outcome.winner} wins! Nicely played.`
    : `Player ${game.turn}’s turn`;
  for (const player of ['X', 'O']) {
    document.querySelector(`#player-${player.toLowerCase()}`).classList.toggle('active', !game.outcome && game.turn === player);
    document.querySelector(`#score-${player.toLowerCase()}`).textContent = scores[player];
  }
  document.querySelector('#score-draw').textContent = scores.draw;
}
cells.forEach((cell, index) => cell.addEventListener('click', () => {
  if (!game.move(index)) return;
  if (game.outcome) scores[game.outcome.winner]++;
  render();
}));
document.querySelector('#new-round').addEventListener('click', () => { game.restart(); render(); });
document.querySelector('#reset').addEventListener('click', () => {
  scores.X = scores.O = scores.draw = 0;
  game.restart(); render();
});
render();
