import { MAX_COLS, MAX_ROWS } from "../../../utils/constants";
import type { GridType, TileType } from "../../../utils/types";

const getNeighbors = (grid: GridType, tile: TileType): TileType[] => {
  const { row, col } = tile;
  const neighbors: TileType[] = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < MAX_ROWS - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < MAX_COLS - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((n) => !n.isWall);
};

export const bidirectionalBfs = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTiles: TileType[] = [];

  // Two separate visited maps to track each direction
  const visitedFromStart = new Map<string, TileType | null>();
  const visitedFromEnd = new Map<string, TileType | null>();

  const key = (t: TileType) => `${t.row}-${t.col}`;

  const startBase = grid[startTile.row][startTile.col];
  const endBase = grid[endTile.row][endTile.col];

  visitedFromStart.set(key(startBase), null);
  visitedFromEnd.set(key(endBase), null);

  const queueStart: TileType[] = [startBase];
  const queueEnd: TileType[] = [endBase];

  let meetingTile: TileType | null = null;

  outer: while (queueStart.length > 0 && queueEnd.length > 0) {
    // Expand from start
    const fromStart = queueStart.shift()!;
    fromStart.isTraversed = true;
    traversedTiles.push(fromStart);

    for (const neighbor of getNeighbors(grid, fromStart)) {
      const k = key(neighbor);
      if (!visitedFromStart.has(k)) {
        visitedFromStart.set(k, fromStart);
        neighbor.parent = fromStart;
        queueStart.push(neighbor);

        if (visitedFromEnd.has(k)) {
          meetingTile = neighbor;
          break outer;
        }
      }
    }

    // Expand from end
    const fromEnd = queueEnd.shift()!;
    fromEnd.isTraversed = true;
    traversedTiles.push(fromEnd);

    for (const neighbor of getNeighbors(grid, fromEnd)) {
      const k = key(neighbor);
      if (!visitedFromEnd.has(k)) {
        visitedFromEnd.set(k, fromEnd);
        queueEnd.push(neighbor);

        if (visitedFromStart.has(k)) {
          meetingTile = neighbor;
          break outer;
        }
      }
    }
  }

  // Build path: start → meeting point
  const path: TileType[] = [];
  if (meetingTile) {
    // Path from start side
    const pathFromStart: TileType[] = [];
    let cur: TileType | null | undefined = meetingTile;
    while (cur) {
      pathFromStart.unshift(cur);
      cur = visitedFromStart.get(key(cur));
    }

    // Path from end side
    const pathFromEnd: TileType[] = [];
    cur = visitedFromEnd.get(key(meetingTile));
    while (cur) {
      pathFromEnd.push(cur);
      cur = visitedFromEnd.get(key(cur));
    }

    const fullPath = [...pathFromStart, ...pathFromEnd];
    for (const tile of fullPath) {
      tile.isPath = true;
      path.push(tile);
    }
  }

  return { traversedTiles, path };
};