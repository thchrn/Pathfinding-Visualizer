import { MAX_COLS, MAX_ROWS, SPEEDS, TILE_STYLE, WALL_TILE_STYLE } from "../../../utils/constants";
import { isEqual, sleep } from "../../../utils/helpers";
import type { GridType, SpeedType, TileType } from "../../../utils/types";

export const primsMaze = async (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  setIsDisabled: (isDisabled: boolean) => void,
  speed: SpeedType
) => {
  const delay = SPEEDS.find((s) => s.value === speed)!.value;

  // Step 1: Make every cell a wall
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      if (!isEqual(grid[row][col], startTile) && !isEqual(grid[row][col], endTile)) {
        grid[row][col].isWall = true;
        document.getElementById(`${row}-${col}`)!.className = `${WALL_TILE_STYLE} animate-wall`;
      }
    }
  }

  await sleep(50);

  // Only operate on odd-indexed cells (the "rooms")
  const inMaze = new Set<string>();
  const walls: Array<{ row: number; col: number; fromRow: number; fromCol: number }> = [];

  const key = (row: number, col: number) => `${row}-${col}`;

  const addWalls = (row: number, col: number) => {
    // Add neighboring walls (2 steps away) in 4 directions
    const directions = [[-2, 0], [2, 0], [0, -2], [0, 2]];
    for (const [dr, dc] of directions) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr > 0 && nr < MAX_ROWS - 1 && nc > 0 && nc < MAX_COLS - 1) {
        if (!inMaze.has(key(nr, nc))) {
          walls.push({ row: nr, col: nc, fromRow: row, fromCol: col });
        }
      }
    }
  };

  // Start from the start tile (1,1)
  const startRow = 1;
  const startCol = 1;
  inMaze.add(key(startRow, startCol));
  grid[startRow][startCol].isWall = false;
  document.getElementById(`${startRow}-${startCol}`)!.className = TILE_STYLE;
  addWalls(startRow, startCol);

  while (walls.length > 0) {
    // Pick a random wall
    const randIndex = Math.floor(Math.random() * walls.length);
    const { row, col, fromRow, fromCol } = walls[randIndex];
    walls.splice(randIndex, 1);

    if (inMaze.has(key(row, col))) continue;

    // Carve: open the wall between fromRow/fromCol and row/col
    const midRow = (row + fromRow) / 2;
    const midCol = (col + fromCol) / 2;

    inMaze.add(key(row, col));

    // Open the room cell
    if (!isEqual(grid[row][col], startTile) && !isEqual(grid[row][col], endTile)) {
      grid[row][col].isWall = false;
      document.getElementById(`${row}-${col}`)!.className = TILE_STYLE;
      await sleep(5 * delay);
    }

    // Open the passage between
    if (!isEqual(grid[midRow][midCol], startTile) && !isEqual(grid[midRow][midCol], endTile)) {
      grid[midRow][midCol].isWall = false;
      document.getElementById(`${midRow}-${midCol}`)!.className = TILE_STYLE;
      await sleep(5 * delay);
    }

    addWalls(row, col);
  }

  // Guarantee end tile is reachable
  const endRow = MAX_ROWS - 2;
  const endCol = MAX_COLS - 2;
  grid[endRow][endCol].isWall = false;
  document.getElementById(`${endRow}-${endCol}`)!.className = TILE_STYLE;

  // Open at least one neighbor of end tile
  if (endRow - 1 > 0) {
    grid[endRow - 1][endCol].isWall = false;
    document.getElementById(`${endRow - 1}-${endCol}`)!.className = TILE_STYLE;
  }

  setIsDisabled(false);
};