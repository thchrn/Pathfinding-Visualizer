import { MAX_COLS, MAX_ROWS } from "../../../utils/constants";
import { createWall } from "../../../utils/createWall";
import { destroyWall } from "../../../utils/destroyWall";
import { getRandInt} from "../../../utils/helpers";
import type { GridType, SpeedType, TileType } from "../../../utils/types";

export const binaryTree = async (
    grid: GridType,
    startTile: TileType,
    endTile: TileType,
    setIsDisabled: (isDisabled: boolean) => void,
    speed: SpeedType
) => {
    // createWall is now async, awaited, and sets isWall on the grid directly
    await createWall(grid, startTile, endTile, speed);

    // The redundant even/even loop is removed — createWall already handles it

    for(let row = 1; row < MAX_ROWS; row += 2){
        for(let col = 1; col < MAX_COLS; col += 2){
            if(row === MAX_ROWS - 2 && col === MAX_COLS - 2) {
                continue
            } else if (row === MAX_ROWS - 2) {
              await destroyWall(grid, row, col, 1, speed);
            } else if (col === MAX_COLS - 2) {
              await destroyWall(grid, row, col, 0, speed);
            } else{
              await destroyWall(grid, row, col, getRandInt(0, 1), speed);
            }
        }      
    }

    setIsDisabled(false);
}