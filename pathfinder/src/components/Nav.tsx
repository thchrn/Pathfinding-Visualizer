import { Select } from "./Select";
import { usePathfinding } from "../hooks/usePathfinding";
import { EXTENDED_SLEEP_TIME,SLEEP_TIME, MAZES, PATHFINDING_ALGORITHMS, SPEEDS } from "../utils/constants";
import type { AlgorithmType, MazeType } from "../utils/types";
import { resetGrid } from "../utils/resetGrid";
import { useTile } from "../hooks/useTile";
import { useState, type RefObject } from "react";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { useSpeed } from "../hooks/useSpeed";
import { PlayButton } from "./PlayButton";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import { animatePath } from "../utils/animatePath";

export function Nav({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: RefObject<boolean>;
}) {
    const [isDisabled, setIsDisabled] = useState(false);
    const {maze , setmaze , grid , setGrid, isGraphVisualized , setIsGraphVisualized , algorithm , setAlgorithm} = usePathfinding(); 
    const {startTile, endTile} = useTile();
    const {speed} = useSpeed();

    const handleGenerateMaze = (maze: MazeType) => {
        if(maze === "NONE"){
            setmaze(maze);
            resetGrid({grid , startTile, endTile});
            return;
        }

        setmaze(maze);
        setIsDisabled(true);
        runMazeAlgorithm({
            maze,
            grid, 
            startTile, 
            endTile, 
            setIsDisabled, 
            speed 
        });
        const newGrid = grid.slice();
        setGrid(newGrid);
        setIsGraphVisualized(false);
    }

    const handleRunVisualizer = () => {
        if(isGraphVisualized){
           setIsGraphVisualized(false);
           resetGrid({grid:grid.slice() , startTile, endTile});
           return
        }

        const {traversedTiles, path} = runPathfindingAlgorithm({
            algorithm,
            grid,
            startTile,
            endTile
        })

        animatePath(traversedTiles, path, startTile, endTile,speed);
        setIsDisabled(true);
        isVisualizationRunningRef.current = true;
        setTimeout(() => {
            const newGrid = grid.slice();
           setGrid(newGrid);
           setIsGraphVisualized(true);
           setIsDisabled(false);
           isVisualizationRunningRef.current = false;
        }, (SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2 ) + EXTENDED_SLEEP_TIME * (path.length + 60) * SPEEDS.find((s) => s.value === speed)!.value));
    }

    return (
        <div className="flex items-center justify-center min-h-[4.5cm] shadow-gray-600 sm:px-5 px-0">
            <div className="flex items-center lg:justify-between juster-center w-full sm:w-[52cm]">
                <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
                    Pathfinding Visualizer
                </h1>
                <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
                    <Select 
                        label="Maze"
                        value={maze} 
                        options={MAZES}
                        onChange={(e) => {
                          handleGenerateMaze(e.target.value as MazeType);
                        }}
                    />
                    <Select 
                        label = "Graph"
                        value = {algorithm}
                        options = {PATHFINDING_ALGORITHMS}
                        onChange={(e) => {
                            setAlgorithm(e.target.value as AlgorithmType);
                            setIsGraphVisualized(false);
                        }}
                    /> 
                    <PlayButton 
                        isDisabled={isDisabled}
                        isGraphVisualized={isGraphVisualized}
                        handlerRunVisualizer={handleRunVisualizer}

                    /> 
                </div>
            </div>
        </div>
    )
}