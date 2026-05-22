import { useRef } from "react";
import { PathfindingProvider } from "./context/PathfindingContext"
import { SpeedProvider } from "./context/SpeedContext"
import { TileProvider } from "./context/TileContext"
import { Nav } from "./components/Nav";


function App() {
  const isVisualizationRunningRef = useRef(false);
  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div className="h-screen w-screen flex flex-col">
            <Nav isVisualizationRunningRef = {isVisualizationRunningRef}/>
      
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  )
}

export default App