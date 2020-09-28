import produce from 'immer';
import React, { useCallback, useRef, useState } from 'react';


// Config
const nRows = 50;
const nCols = 50;
const stepTimeout = 1000;

// Function to create the template grid data structure
const createEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < nRows; i++) {
    rows.push(Array.from(Array(nCols), () => 0));
  }

  return rows;
};

// Helper structure to compute the neighbors of each cell
const operarions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
]

const App: React.FC = () => {

  // State
  const [grid, setGrid] = useState(() => { return createEmptyGrid() });
  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {

    const isRunning = runningRef.current;
    if (!isRunning) return;

    // Simulate current step
    setGrid(currentGrid => {
      return produce(currentGrid, draftGrid => {
        for (let i = 0; i < nRows; i++) {
          for (let j = 0; j < nCols; j++) {

            let neighbors = 0;

            operarions.forEach(operation => {
              const newI = i + operation[0];
              const newJ = j + operation[1];

              // Check bounds
              if (newI >= 0 && newI < nRows && newJ >= 0 && newJ < nCols) {
                neighbors += currentGrid[newI][newJ];
              }

              // Game logic
              if (neighbors < 2 || neighbors > 3) draftGrid[i][j] = 0;
              else if (currentGrid[i][j] === 0 && neighbors === 3) draftGrid[i][j] = 1;

            })
          }
        }
      })
    })

    // Invoke next step
    setTimeout(runSimulation, stepTimeout)
  }, [])

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          runSimulation();
        }}
      >
        {!running ? 'Start' : 'Stop'}
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${nCols}, 20px)`
        }}>
        {grid.map((row, i) =>
          row.map((col, j) =>
            <div
              key={`${i}-${j}`} // Unique key based on cell position
              onClick={() => { // Toggle cell on click
                const newGrid = produce(grid, draftGrid => {
                  draftGrid[i][j] = grid[i][j] === 0 ? 1 : 0;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20, height: 20,
                backgroundColor: col === 1 ? 'blue' : 'white',
                border: 'solid 1px black'
              }}>

            </div>))}
      </div>
    </>
  )
}

export default App;
