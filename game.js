export const winningLines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export function result(board) {
  for (const line of winningLines) {
    if (board[line[0]] && line.every(i => board[i] === board[line[0]])) {
      return { winner: board[line[0]], line };
    }
  }
  return board.every(Boolean) ? { winner: 'draw', line: [] } : null;
}
export function createGame() {
  let board = Array(9).fill(null), turn = 'X', outcome = null;
  return {
    get board() { return [...board]; },
    get turn() { return turn; },
    get outcome() { return outcome; },
    move(index) {
      if (!Number.isInteger(index) || index < 0 || index > 8 || outcome || board[index]) return false;
      board[index] = turn;
      outcome = result(board);
      if (!outcome) turn = turn === 'X' ? 'O' : 'X';
      return true;
    },
    restart() { board = Array(9).fill(null); turn = 'X'; outcome = null; }
  };
}
