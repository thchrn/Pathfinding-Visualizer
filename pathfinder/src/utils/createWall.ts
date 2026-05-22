import { MAX_COLS, MAX_ROWS, SPEEDS, WALL_TILE_STYLE } from "./constants";
import { isRowColEqual, sleep } from "./helpers";
import type { GridType, SpeedType, TileType } from "./types";

export const createWall = async (
    grid: GridType,
    startTile: TileType, 
    endTile: TileType,
    speed: SpeedType,
) => {
    const delay = 6 * SPEEDS.find((s) => s.value === speed)!.value - 1;

    for(let row = 0; row < MAX_ROWS; row++) {
        for(let col = 0; col < MAX_COLS; col++) {
            if (row % 2 === 0 || col % 2 === 0) {
                if (!isRowColEqual(row, col, startTile) && !isRowColEqual(row, col, endTile)) {
                    grid[row][col].isWall = true;
                    document.getElementById(`${row}-${col}`)!.className = `${WALL_TILE_STYLE} animate-wall`;
                    await sleep(delay);
                }
            }
        }
    }
}