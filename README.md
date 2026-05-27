# Pathfinding Visualizer 

## What Is It?

Pathfinding Visualizer is an interactive, browser-based tool that animates how graph traversal and shortest-path algorithms navigate through a grid in real time. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, it lets users watch algorithms "think" — exploring cells, marking visited nodes, and tracing the final path — making abstract CS concepts tangible and easy to understand.

The project sits in the `pathfinder/` subdirectory of the repository and runs as a standard Next.js web application.

---

## What It Does

### Pathfinding Algorithms

Five algorithms are implemented, each with different characteristics:

| Algorithm | Weighted | Guarantees Shortest Path |
|---|---|---|
| Breadth-First Search (BFS) | No | Yes |
| Dijkstra's Algorithm | Yes | Yes |
| A\* Search | Yes | Yes |
| Depth-First Search (DFS) | No | No |
| Greedy Best-First Search | Yes | No |
| Bidirectional BFS | No | Yes |

Weighted algorithms respect cell costs; unweighted treat all moves as equal. Algorithms that guarantee the shortest path will always find the optimal route — others may find *a* path, but not necessarily the best one.

### Maze Generation

Two procedural maze generation algorithms are available to auto-populate the grid with walls:

- **Recursive Division** — recursively splits the grid into chambers, carving passages at random points to create interconnected, winding mazes.
- **Binary Tree** — carves paths through the grid using binary tree logic, producing a different pattern each time.
- **Prim's Algorithm** — grows a maze from a single cell by randomly expanding the frontier, producing organic, natural-looking mazes.

### Interactive Grid

Users aren't limited to generated mazes. The grid supports full manual editing — click or click-and-drag to draw walls, erase them, and customize the layout before running any algorithm.

### Other Controls

- **Three animation speeds** — Slow, Medium, Fast — to suit both learning and quick demonstration.
- **Play / Play Again** — re-runs the algorithm on the current grid without clearing walls.
- **New Maze** — generates a fresh maze and resets the traversal.
- Visual distinction between the **green start tile** and **red end tile**, visited cells, and the final path.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Runtime | Node.js v18+ |

---

## Project Structure

```
pathfinder/
├── src/
│   ├── app/                   # Next.js app entry point and routing
│   ├── components/            # UI components: Grid, Tile, Nav, Select, PlayButton
│   ├── hooks/                 # Custom hooks: usePathfinding, useTile, useSpeed
│   ├── lib/
│   │   └── algorithm/
│   │       ├── pathfinding/   # bfs, dijkstra, aStar, dfs, greedy
│   │       └── maze/          # binaryTree, recursiveDivision
│   └── utils/                 # Helpers, constants, types, resetGrid, etc.
```

The algorithm logic is cleanly separated from the UI — each pathfinding and maze algorithm lives in its own file under `lib/algorithm/`, while React hooks manage state and animation timing.

---

## How to Run It

### Prerequisites

- **Node.js** v18 or higher
- **npm**

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/thchrn/Pathfinding-Visualizer.git

# 2. Navigate into the app directory
cd Pathfinding-Visualizer/pathfinder

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Use It

1. **Generate a maze** using the Maze dropdown, or draw walls manually by clicking/dragging on the grid.
2. **Select an algorithm** from the Graph dropdown.
3. **Choose a speed** (Slow / Medium / Fast) from the Speed dropdown.
4. **Press Play** — the algorithm will animate from the green start tile to the red end tile.
5. Press **Play Again** to re-run on the same grid, or pick a new maze to start fresh.

---

## License

MIT
