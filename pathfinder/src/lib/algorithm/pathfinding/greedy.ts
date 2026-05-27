import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { isEqual, dropFromQueue } from "../../../utils/helpers";
import { initHeuristicCost } from "../../../utils/heuristics";
import type { GridType, TileType } from "../../../utils/types";

export const greedy = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTiles: TileType[] = [];
  const heuristicCost = initHeuristicCost(grid, endTile);

  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.isTraversed = true;

  const untraversedTiles = [base];

  while (untraversedTiles.length > 0) {
    // Sort purely by heuristic — greedy doesn't care about distance travelled
    untraversedTiles.sort(
      (a, b) => heuristicCost[a.row][a.col] - heuristicCost[b.row][b.col]
    );

    const currentTile = untraversedTiles.shift()!;
    if (currentTile.isWall) continue;
    if (currentTile.distance === Infinity) break;

    currentTile.isTraversed = true;
    traversedTiles.push(currentTile);

    if (isEqual(currentTile, endTile)) break;

    const neighbors = getUntraversedNeighbors(grid, currentTile);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (currentTile.distance + 1 < neighbor.distance) {
        dropFromQueue(neighbor, untraversedTiles);
        neighbor.distance = currentTile.distance + 1;
        neighbor.parent = currentTile;
        untraversedTiles.push(neighbor);
      }
    }
  }

  const path: TileType[] = [];
  let tile = grid[endTile.row][endTile.col];
  while (tile !== null) {
    tile.isPath = true;
    path.unshift(tile);
    tile = tile.parent!;
  }

  return { traversedTiles, path };
};