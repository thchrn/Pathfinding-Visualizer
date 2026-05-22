import { binaryTree } from "../lib/algorithm/maze/binaryTree";
import recursiveDivision from "../lib/algorithm/maze/recursiveDivision";
import { MAX_COLS, MAX_ROWS, SPEEDS, TILE_STYLE } from "./constants";
import { constructBorder } from "./constructBorder";
import type { GridType, MazeType, SpeedType, TileType } from "./types";

export const runMazeAlgorithm = async ({
  maze,
  grid,
  startTile,
  endTile,
  setIsDisabled,
  speed,
}: {
  maze: MazeType;
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
  setIsDisabled: (isDisabled: boolean) => void;
  speed: SpeedType;
}) => {
  if (maze == "Binary Tree") {
    await binaryTree(grid, startTile, endTile, setIsDisabled, speed);
  } else if (maze == "Recursive Division") {
    const currentSpeed = SPEEDS.find((s) => s.value === speed)!.value ?? 2;
    await constructBorder(grid, startTile, endTile);
    await recursiveDivision({
      grid,
      startTile,
      endTile,
      row: 1,
      col: 1,
      height: Math.floor((MAX_ROWS - 1) / 2),
      width: Math.floor((MAX_COLS - 1) / 2),
      setIsDisabled,
      speed,
    });

    // Guarantee passage next to start (1,1)
    grid[1][2].isWall = false;
    document.getElementById(`1-2`)!.className = TILE_STYLE;
    grid[2][1].isWall = false;
    document.getElementById(`2-1`)!.className = TILE_STYLE;

    // Guarantee passage next to end (MAX_ROWS-2, MAX_COLS-2)
    grid[MAX_ROWS - 2][MAX_COLS - 3].isWall = false;
    document.getElementById(`${MAX_ROWS - 2}-${MAX_COLS - 3}`)!.className = TILE_STYLE;
    grid[MAX_ROWS - 3][MAX_COLS - 2].isWall = false;
    document.getElementById(`${MAX_ROWS - 3}-${MAX_COLS - 2}`)!.className = TILE_STYLE;

    setTimeout(() => {
      setIsDisabled(false);
    }, 800 * currentSpeed);
  }
};