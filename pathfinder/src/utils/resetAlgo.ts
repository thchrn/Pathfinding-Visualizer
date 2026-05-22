import { MAX_COLS, MAX_ROWS } from "./constants";
import type { GridType } from "./types";

export const resetAlgorithm = ({
  grid,
}: {
  grid: GridType;
}) => {
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      const tile = grid[row][col];

      tile.distance = Infinity;
      tile.isTraversed = false;
      tile.isPath = false;
      tile.parent = null;

      const tileElement = document.getElementById(
        `${tile.row}-${tile.col}`
      );

      if (tileElement) {
        tileElement.classList.remove(
          "tile-traversed",
          "tile-path"
        );
      }
    }
  }
};