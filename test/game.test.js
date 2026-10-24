import test from 'node:test';
import assert from 'node:assert/strict';
import { createGame, result, winningLines } from '../game.js';
test('every winning line is detected for either player', () => {
  for (const player of ['X', 'O']) for (const line of winningLines) {
    const board = Array(9).fill(null);
    line.forEach(i => board[i] = player);
    assert.deepEqual(result(board), { winner: player, line });
  }
});
test('turns alternate, occupied cells and moves after a win are rejected', () => {
  const game = createGame();
  assert.equal(game.move(0), true);
  assert.equal(game.turn, 'O');
  assert.equal(game.move(0), false);
  assert.equal(game.turn, 'O');
  [3,1,4,2].forEach(i => assert.equal(game.move(i), true));
  assert.equal(game.outcome.winner, 'X');
  assert.equal(game.move(8), false);
});
test('a full non-winning board is a draw and restart clears the round', () => {
  const game = createGame();
  [0,1,2,4,3,5,7,6,8].forEach(i => game.move(i));
  assert.equal(game.outcome.winner, 'draw');
  game.restart();
  assert.deepEqual(game.board, Array(9).fill(null));
  assert.equal(game.turn, 'X');
  assert.equal(game.outcome, null);
});
