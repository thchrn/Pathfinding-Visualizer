import { bfs } from "../lib/algorithm/pathfinding/bfs";
import { dfs } from "../lib/algorithm/pathfinding/dfs";
import { dijkstra } from "../lib/algorithm/pathfinding/dijkstra";
import { astar } from "../lib/algorithm/pathfinding/astar";
import { greedy } from "../lib/algorithm/pathfinding/greedy";
import { bidirectionalBfs } from "../lib/algorithm/pathfinding/bidirectionalBfs";
import type { AlgorithmType, GridType, TileType } from "./types";

export const runPathfindingAlgorithm = ({
    algorithm,
    grid,
    startTile,
    endTile
} : {
    algorithm : AlgorithmType;
    grid : GridType;
    startTile : TileType;
    endTile : TileType;
}) => {
   switch(algorithm){
     case "BFS":
        return bfs(grid, startTile, endTile);
     case "DFS":
        return dfs(grid, startTile, endTile);
     case "Dijkstra":
        return dijkstra(grid, startTile, endTile);
     case "A*":
        return astar(grid, startTile, endTile);
     case "Greedy Best-First Search":
        return greedy(grid, startTile, endTile);
     case "Bidirectional BFS":
        return bidirectionalBfs(grid, startTile, endTile);
     default:
        return bfs(grid, startTile, endTile);
   } 
}