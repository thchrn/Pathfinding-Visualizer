import { createContext , useState } from "react";
import type { ReactNode } from "react";
import type { TileType } from "../utils/types";
import { END_TILE, START_TILE } from "../utils/constants";

interface TileContextInterface {
    startTile: TileType;
    setstartTile: (startTile: TileType) => void;
    endTile: TileType;
    setendTile: (endTile: TileType) => void;
}

export const TileContext = createContext<TileContextInterface | undefined>(undefined);

export const TileProvider = ({children}: {children: ReactNode}) => {
    const [startTile, setstartTile] = useState<TileType>(START_TILE);
    const [endTile, setendTile] = useState<TileType>(END_TILE);

    return (
        <TileContext.Provider 
            value={{
                startTile, 
                setstartTile, 
                endTile, 
                setendTile
            }}
        >
            {children}
        </TileContext.Provider>
    );
}