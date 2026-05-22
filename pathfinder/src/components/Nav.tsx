import { Select } from "./Select";
import { usePathfinding } from "../hooks/usePathfinding";
import { EXTENDED_SLEEP_TIME,SLEEP_TIME, MAZES, PATHFINDING_ALGORITHMS, SPEEDS } from "../utils/constants";
import type { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { resetGrid } from "../utils/resetGrid";
import { useTile } from "../hooks/useTile";
import { useState, type RefObject } from "react";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { useSpeed } from "../hooks/useSpeed";
import { PlayButton } from "./PlayButton";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import { animatePath } from "../utils/animatePath";
import { resetAlgorithm } from "../utils/resetAlgo";
import { Grid } from "./Grid";

export function Nav({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: RefObject<boolean>;
}) {

    const [isDisabled, setIsDisabled] = useState(false);

    // =========================
    // ADDED: Stats State
    // =========================
    const [stats, setStats] = useState({
        time: 0,
        visited: 0,
        pathLength: 0,
    });

    const {
        maze,
        setmaze,
        grid,
        setGrid,
        isGraphVisualized,
        setIsGraphVisualized,
        algorithm,
        setAlgorithm
    } = usePathfinding();

    const {startTile, endTile} = useTile();
    const {speed , setSpeed} = useSpeed();

    const handleGenerateMaze = (maze: MazeType) => {

        if(maze === "NONE"){
            setmaze(maze);
            resetGrid({grid , startTile, endTile});
            return;
        }

        setmaze(maze);
        setIsDisabled(true);

        resetGrid({grid, startTile, endTile});

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

        // =========================
        // ADDED: Reset ONLY algorithm state
        // Keeps maze/walls intact
        // =========================
        resetAlgorithm({grid});

        if(isGraphVisualized){
            setIsGraphVisualized(false);

            resetGrid({
                grid:grid.slice(),
                startTile,
                endTile
            });

            return;
        }

        // =========================
        // ADDED: Start timer
        // =========================
        const startTime = performance.now();

        const {traversedTile, path} = runPathfindingAlgorithm({
            algorithm,
            grid,
            startTile,
            endTile
        });

        // =========================
        // ADDED: End timer
        // =========================
        const endTime = performance.now();

        // =========================
        // ADDED: Save stats
        // =========================
        setStats({
            time: endTime - startTime,
            visited: traversedTile.length,
            pathLength: path.length,
        });

        animatePath(
            traversedTile,
            path,
            startTile,
            endTile,
            speed
        );

        setIsDisabled(true);

        isVisualizationRunningRef.current = true;

        setTimeout(() => {

            const newGrid = grid.slice();

            setGrid(newGrid);

            setIsGraphVisualized(true);

            setIsDisabled(false);

            isVisualizationRunningRef.current = false;

        }, (
            SLEEP_TIME * (traversedTile.length + SLEEP_TIME * 2 ) +
            EXTENDED_SLEEP_TIME * (path.length + 60) *
            SPEEDS.find((s) => s.value === speed)!.value
        ));
    }

    return (
    <div className="min-h-screen bg-[#020617] p-6">

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

            <div className="w-full lg:w-[320px] flex flex-col gap-6">

                <div className="bg-[#1e293b] rounded-3xl p-8 shadow-2xl border border-slate-700">

                    <h1 className="text-3xl font-bold text-cyan-400 mb-8 tracking-wide">
                        Pathfinding Visualizer
                    </h1>

                    <div className="flex flex-col gap-6">

                        <Select 
                            label="Maze"
                            value={maze} 
                            options={MAZES}
                            onChange={(e) => {
                                handleGenerateMaze(
                                    e.target.value as MazeType
                                );
                            }}
                        />

                        <Select 
                            label="Algorithm"
                            value={algorithm}
                            options={PATHFINDING_ALGORITHMS}
                            onChange={(e) => {
                                setAlgorithm(
                                    e.target.value as AlgorithmType
                                );

                                setIsGraphVisualized(false);
                            }}
                        /> 

                        <Select 
                            label="Speed"
                            value={speed}
                            options={SPEEDS}
                            onChange={(e) => {
                                setSpeed(
                                    parseInt(e.target.value) as SpeedType
                                );
                            }}
                        />

                        <div className="pt-2">
                            <PlayButton 
                                isDisabled={isDisabled}
                                isGraphVisualized={
                                    isGraphVisualized
                                }
                                handlerRunVisualizer={
                                    handleRunVisualizer
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* STATS PANEL */}
                <div className="bg-[#1e293b] rounded-3xl p-8 shadow-2xl border border-slate-700">

                    <h2 className="text-2xl font-semibold text-cyan-300 mb-6">
                        Stats
                    </h2>

                    <div className="flex flex-col gap-4 text-slate-200 text-lg">

                        <div className="flex items-center justify-between">
                            <span> Time</span>
                            <span>
                                {stats.time.toFixed(2)} ms
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span> Visited</span>
                            <span>{stats.visited}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span> Path</span>
                            <span>{stats.pathLength}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex items-start justify-center">
               <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
            </div>
        </div>
    </div>
)
}