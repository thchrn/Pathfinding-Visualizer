import type { ReactNode } from "react";
import { createContext, useState } from "react";
import type { AlgorithmType, MazeType, GridType } from "../utils/types";
import { END_TILE, START_TILE } from "../utils/constants";
import { createGrid } from "../utils/helpers";

interface PathfindingAlgorithmInterface {
  algorithm: AlgorithmType;
  setAlgorithm: (algorithm: AlgorithmType) => void;
  maze: MazeType;
  setmaze: (maze: MazeType) => void;
  grid: GridType;
  setGrid: (grid: GridType) => void;
  isGraphVisualized: boolean;
  setIsGraphVisualized: (isGraphVisualized: boolean) => void;
}

export const PathfindingContext = createContext<
  PathfindingAlgorithmInterface | undefined
>(undefined);

export const PathfindingProvider = ({children}: {children: ReactNode}) => {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('Dijkstra');
  const [maze, setmaze] = useState<MazeType>('NONE');
  const [grid, setGrid] = useState<GridType>(createGrid(START_TILE, END_TILE));
  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);

  return (
    <PathfindingContext.Provider
      value={{
        algorithm,
        setAlgorithm,
        maze,
        setmaze,
        grid,
        setGrid,
        isGraphVisualized,
        setIsGraphVisualized,
      }}
    >
      {children}
    </PathfindingContext.Provider>
  );
};