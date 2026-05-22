import { twMerge } from "tailwind-merge";
import { usePathfinding } from "../hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import { Tile } from "./Tile";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";
import { type RefObject, useState } from "react";


export function Grid({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: RefObject<boolean>;
}) {
  const { grid , setGrid } = usePathfinding();
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)){
        return;
    }

    setIsMouseDown(true);
    const newGrid = createNewGrid(grid,row,col);
    setGrid(newGrid);
  };

  const handleMouseUp = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)){
        return;
    }

    setIsMouseDown(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)){
        return;
    }

    if(isMouseDown){
        const newGrid = createNewGrid(grid,row,col);
        setGrid(newGrid);
    }
  }
  return (
    <div
      className={twMerge(
        // Base classes
        "flex items-center flex-col justify-center border-sky-300 mt-10",

        // Control Grid height
        `lg:min-h-[${MAX_ROWS * 17}px] md:min-h-[${
          MAX_ROWS * 15
        }px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,

        // Controlling grid width
        `lg:w-[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] xs:w-[${
          MAX_COLS * 8
        }px] w-[${MAX_COLS * 7}px]`
      )}
    >
      {grid.map((r, rowIndex) => (
        <div key={rowIndex} className="flex">
          {r.map((tile, tileIndex) => {
            const { row , col , isStart, isEnd, isTraversed, isWall, isPath } = tile;
            return (
                <Tile 
                    row={rowIndex}
                    col={tileIndex}
                    isStart={isStart}
                    isEnd={isEnd}
                    isTraversed={isTraversed}
                    isWall={isWall}
                    isPath={isPath}
                    handleMouseDown={() => handleMouseDown(row,col)}
                    handleMouseUp={() => handleMouseUp(row,col)}
                    handleMouseEnter={() => handleMouseEnter(row,col)}
                />
            )
          })}
        </div>
      ))}
    </div>
  );
}