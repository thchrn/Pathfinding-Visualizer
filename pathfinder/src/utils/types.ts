export type AlgorithmType = 'Dijkstra' | 'A*' | 'BFS' | 'DFS' | 'Greedy Best-First Search';
export type MazeType = 'NONE' | 'Binary Tree' | 'Recursive Division' ;

export interface AlgorithmSelectType{
    name : string;
    value : AlgorithmType;
}

export interface MazeSelectType{
    name : string;
    value : MazeType;
}
export type TileType = {
    row: number;
    col: number;
    isEnd: boolean;
    isWall: boolean;
    isPath: boolean;
    distance: number;
    isStart : boolean;
    isTraversed: boolean;
    parent : TileType | null;
}
export type GridType = TileType[][];

export type SpeedType = 2 | 1 | 0.5;

export interface SpeedSelectType{
    name : string;
    value : SpeedType;
}
