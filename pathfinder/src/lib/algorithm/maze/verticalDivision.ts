import { SPEEDS, WALL_TILE_STYLE } from "../../../utils/constants";
import { getRandInt, isEqual, sleep } from "../../../utils/helpers";
import type { GridType, SpeedType, TileType } from "../../../utils/types";
import recursiveDivision from "./recursiveDivision";

export async function verticalDivision({
  grid,
  startTile,
  endTile,
  row,
  col,
  height,
  width,
  setIsDisabled,
  speed,
}: {
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
  row: number;
  col: number;
  height: number;
  width: number;
  setIsDisabled: (isDisabled: boolean) => void;
  speed: SpeedType;
}) {

  if (height <= 0 || width <= 0) return;
  const makeWallAt = col + getRandInt(0, width - 1) * 2 + 1;
  const makePassageAt = row + getRandInt(0, height - 1) * 2; // fix: was (0, height)

  for (let i = 0; i < 2 * height - 1; i++) {
    if (makePassageAt !== row + i) {
      if (!isEqual(grid[row + i][makeWallAt], startTile) &&
          !isEqual(grid[row + i][makeWallAt], endTile)) {

        grid[row + i][makeWallAt].isWall = true;

        document.getElementById(`${row + i}-${makeWallAt}`)!.className =
          `${WALL_TILE_STYLE} animate-wall`

        await sleep(10 * SPEEDS.find((s) => s.value === speed)!.value - 5)
      }
    }
  }

  const leftWidth = Math.floor((makeWallAt - col) / 2);
  const rightWidth = width - leftWidth - 1;

  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    width: leftWidth,
    setIsDisabled,
    speed,
  })

  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row,
    col: makeWallAt + 1,
    height,
    width: rightWidth,
    setIsDisabled,
    speed,
  })
}