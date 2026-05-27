// import { Select } from "./Select";
// import { usePathfinding } from "../hooks/usePathfinding";
// import { EXTENDED_SLEEP_TIME,SLEEP_TIME, MAZES, PATHFINDING_ALGORITHMS, SPEEDS } from "../utils/constants";
// import type { AlgorithmType, MazeType, SpeedType } from "../utils/types";
// import { resetGrid } from "../utils/resetGrid";
// import { useTile } from "../hooks/useTile";
// import { useState, type RefObject } from "react";
// import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
// import { useSpeed } from "../hooks/useSpeed";
// import { PlayButton } from "./PlayButton";
// import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
// import { animatePath } from "../utils/animatePath";
// import { resetAlgorithm } from "../utils/resetAlgo";
// import { Grid } from "./Grid";

// export function Nav({
//   isVisualizationRunningRef,
// }: {
//   isVisualizationRunningRef: RefObject<boolean>;
// }) {

//     const [isDisabled, setIsDisabled] = useState(false);

//     // =========================
//     // ADDED: Stats State
//     // =========================
//     const [stats, setStats] = useState({
//         time: 0,
//         visited: 0,
//         pathLength: 0,
//     });

//     const {
//         maze,
//         setmaze,
//         grid,
//         setGrid,
//         isGraphVisualized,
//         setIsGraphVisualized,
//         algorithm,
//         setAlgorithm
//     } = usePathfinding();

//     const {startTile, endTile} = useTile();
//     const {speed , setSpeed} = useSpeed();

//     const handleGenerateMaze = (maze: MazeType) => {

//         if(maze === "NONE"){
//             setmaze(maze);
//             resetGrid({grid , startTile, endTile});
//             return;
//         }

//         setmaze(maze);
//         setIsDisabled(true);

//         resetGrid({grid, startTile, endTile});

//         runMazeAlgorithm({
//             maze,
//             grid,
//             startTile,
//             endTile,
//             setIsDisabled,
//             speed
//         });

//         const newGrid = grid.slice();
//         setGrid(newGrid);

//         setIsGraphVisualized(false);
//     }

//     const handleRunVisualizer = () => {

//         // =========================
//         // ADDED: Reset ONLY algorithm state
//         // Keeps maze/walls intact
//         // =========================
//         resetAlgorithm({grid});

//         if(isGraphVisualized){
//             setIsGraphVisualized(false);

//             resetGrid({
//                 grid:grid.slice(),
//                 startTile,
//                 endTile
//             });

//             return;
//         }

//         // =========================
//         // ADDED: Start timer
//         // =========================
//         const startTime = performance.now();

//         const {traversedTiles, path} = runPathfindingAlgorithm({
//             algorithm,
//             grid,
//             startTile,
//             endTile
//         });

//         // =========================
//         // ADDED: End timer
//         // =========================
//         const endTime = performance.now();

//         // =========================
//         // ADDED: Save stats
//         // =========================
//         setStats({
//             time: endTime - startTime,
//             visited: traversedTiles.length,
//             pathLength: path.length,
//         });

//         animatePath(
//             traversedTiles,
//             path,
//             startTile,
//             endTile,
//             speed
//         );

//         setIsDisabled(true);

//         isVisualizationRunningRef.current = true;

//         setTimeout(() => {

//             const newGrid = grid.slice();

//             setGrid(newGrid);

//             setIsGraphVisualized(true);

//             setIsDisabled(false);

//             isVisualizationRunningRef.current = false;

//         }, (
//             SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2 ) +
//             EXTENDED_SLEEP_TIME * (path.length + 60) *
//             SPEEDS.find((s) => s.value === speed)!.value
//         ));
//     }

//     return (
//     <div className="min-h-screen bg-[#020617] p-6">

//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

//             <div className="w-full lg:w-[420px] flex flex-col justify-center gap-6 ">

//                 <div className="bg-[#1e293b] rounded-3xl p-8 shadow-2xl border border-slate-700">

//                     <h1 className="text-3xl font-bold text-cyan-400 mb-8 tracking-wide">
//                         Pathfinding Visualizer
//                     </h1>

//                     <div className="flex flex-col gap-6">

//                         <Select 
//                             label="Maze"
//                             value={maze} 
//                             options={MAZES}
//                             onChange={(e) => {
//                                 handleGenerateMaze(
//                                     e.target.value as MazeType
//                                 );
//                             }}
//                         />

//                         <Select 
//                             label="Algorithm"
//                             value={algorithm}
//                             options={PATHFINDING_ALGORITHMS}
//                             onChange={(e) => {
//                                 setAlgorithm(
//                                     e.target.value as AlgorithmType
//                                 );

//                                 setIsGraphVisualized(false);
//                             }}
//                         /> 

//                         <Select 
//                             label="Speed"
//                             value={speed}
//                             options={SPEEDS}
//                             onChange={(e) => {
//                                 setSpeed(
//                                     parseInt(e.target.value) as SpeedType
//                                 );
//                             }}
//                         />

//                         <div className="pt-2">
//                             <PlayButton 
//                                 isDisabled={isDisabled}
//                                 isGraphVisualized={
//                                     isGraphVisualized
//                                 }
//                                 handlerRunVisualizer={
//                                     handleRunVisualizer
//                                 }
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* STATS PANEL */}
//                 <div className="bg-[#1e293b] rounded-3xl px-12 py-4 shadow-2xl border border-slate-700 w-full max-w-5xl">

//                     <h2 className="text-2xl font-semibold text-cyan-300 mb-6">
//                         Stats
//                     </h2>

//                     <div className="flex flex-col gap-4 text-slate-200 text-lg">

//                         <div className="flex items-center justify-between">
//                             <span> Time</span>
//                             <span>
//                                 {stats.time.toFixed(2)} ms
//                             </span>
//                         </div>

//                         <div className="flex items-center justify-between">
//                             <span> Visited</span>
//                             <span>{stats.visited}</span>
//                         </div>

//                         <div className="flex items-center justify-between">
//                             <span> Path</span>
//                             <span>{stats.pathLength}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex-1 flex items-start justify-center -mt-10">
//                <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
//             </div>
//         </div>
//     </div>
// )
// }


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
        runMazeAlgorithm({ maze, grid, startTile, endTile, setIsDisabled, speed });
        const newGrid = grid.slice();
        setGrid(newGrid);
        setIsGraphVisualized(false);
    }

    const handleRunVisualizer = () => {
        resetAlgorithm({grid});

        if(isGraphVisualized){
            setIsGraphVisualized(false);
            resetGrid({ grid: grid.slice(), startTile, endTile });
            return;
        }

        const startTime = performance.now();
        const {traversedTiles, path} = runPathfindingAlgorithm({ algorithm, grid, startTile, endTile });
        const endTime = performance.now();

        setStats({
            time: endTime - startTime,
            visited: traversedTiles.length,
            pathLength: path.length,
        });

        animatePath(traversedTiles, path, startTile, endTile, speed);
        setIsDisabled(true);
        isVisualizationRunningRef.current = true;

        setTimeout(() => {
            const newGrid = grid.slice();
            setGrid(newGrid);
            setIsGraphVisualized(true);
            setIsDisabled(false);
            isVisualizationRunningRef.current = false;
        }, (
            SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) +
            EXTENDED_SLEEP_TIME * (path.length + 60) *
            SPEEDS.find((s) => s.value === speed)!.value
        ));
    }

    return (
        <div className="min-h-screen bg-[#020617] p-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

                {/* ── Sidebar ── */}
                <div className="w-full lg:w-[450px] flex flex-col gap-5 flex-shrink-0">

                    {/* Controls Card */}
                    <div className="relative bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-2xl overflow-hidden">
                        {/* subtle cyan glow top-left */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                        {/* header */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-white leading-tight">
                                Pathfinding{" "}
                                <span className="text-cyan-400">Visualizer</span>
                            </h1>
                        </div>

                        {/* divider */}
                        <div className="h-px bg-gradient-to-r from-cyan-500/40 via-slate-600/30 to-transparent mb-6" />

                        <div className="flex flex-col gap-5">
                            <Select
                                label="Maze"
                                value={maze}
                                options={MAZES}
                                onChange={(e) => handleGenerateMaze(e.target.value as MazeType)}
                            />
                            <Select
                                label="Algorithm"
                                value={algorithm}
                                options={PATHFINDING_ALGORITHMS}
                                onChange={(e) => {
                                    setAlgorithm(e.target.value as AlgorithmType);
                                    setIsGraphVisualized(false);
                                }}
                            />
                            <Select
                                label="Speed"
                                value={speed}
                                options={SPEEDS}
                                onChange={(e) => setSpeed(parseInt(e.target.value) as SpeedType)}
                            />

                            <div className="pt-1">
                                <PlayButton
                                    isDisabled={isDisabled}
                                    isGraphVisualized={isGraphVisualized}
                                    handlerRunVisualizer={handleRunVisualizer}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="relative bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-2xl overflow-hidden">
                        {/* subtle purple glow bottom-right */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

                        {/* header */}
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-1.5 h-5 rounded-full bg-cyan-400" />
                            <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
                                Run Statistics
                            </p>
                        </div>

                        {/* stat rows */}
                        <div className="flex flex-col gap-3">

                            {/* Time */}
                            <div className="flex items-center justify-between bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_2px_rgba(34,211,238,0.5)]" />
                                    <span className="text-slate-400 text-sm">Time</span>
                                </div>
                                <span className="text-cyan-300 text-sm font-mono font-semibold tabular-nums">
                                    {stats.time.toFixed(2)}{" "}
                                    <span className="text-slate-500 text-xs font-normal">ms</span>
                                </span>
                            </div>

                            {/* Visited */}
                            <div className="flex items-center justify-between bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_6px_2px_rgba(56,189,248,0.5)]" />
                                    <span className="text-slate-400 text-sm">Visited</span>
                                </div>
                                <span className="text-sky-300 text-sm font-mono font-semibold tabular-nums">
                                    {stats.visited}
                                    <span className="text-slate-500 text-xs font-normal ml-1">nodes</span>
                                </span>
                            </div>

                            {/* Path */}
                            <div className="flex items-center justify-between bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
                                    <span className="text-slate-400 text-sm">Path</span>
                                </div>
                                <span className="text-emerald-300 text-sm font-mono font-semibold tabular-nums">
                                    {stats.pathLength}
                                    <span className="text-slate-500 text-xs font-normal ml-1">steps</span>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

                {/* ── Grid ── */}
                <div className="flex-1 flex items-start justify-center -mt-8.5">
                    <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
                </div>

            </div>
        </div>
    );
}