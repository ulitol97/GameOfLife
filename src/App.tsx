import produce from 'immer';
import React, { useCallback, useEffect, useRef, useState } from 'react';


// Config
const numRows = 30;
const numCols = 50;
const stepTimeout = 250;
const randomizeProbability = 0.5;

// Function to create the template grid data structure
const createEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

const createRandomGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => Math.random() >= randomizeProbability ? 1 : 0));
  }

  return rows;
};

// Helper structure to compute the neighbors of each cell
const operations = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, -1],
  [1, 1],
  [-1, -1],
  [-1, 1]
]

enum GameState {
  Stopped,
  Paused,
  Running,
}

const App: React.FC = () => {

  // State
  const [grid, setGrid] = useState(() => { return createEmptyGrid() });
  const [gameState, setGameState] = useState(GameState.Stopped);
  let [step, setStep] = useState(0);

  // Refs
  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;

  const stepRef = useRef(step);
  stepRef.current = step;

  // Trigger corresponding actions when simulation is started/stopped
  useEffect(() => {

    if (gameState === GameState.Stopped) stopSimulation()
    else if (gameState === GameState.Running) runSimulation()

  }, [gameState])


  // UseCallback to create the function only one
  const runSimulation = useCallback(() => {

    const gameState = gameStateRef.current;
    if (gameState !== GameState.Running) return;

    // Simulate current step
    setGrid(currentGrid => {
      return produce(currentGrid, draftGrid => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {

            let neighbors = 0;

            operations.forEach(operation => {
              const newI = i + operation[0];
              const newJ = j + operation[1];

              // Check bounds
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += currentGrid[newI][newJ];
              }
            });

            // Game logic
            if (neighbors < 2 || neighbors > 3) draftGrid[i][j] = 0;
            else if (currentGrid[i][j] === 0 && neighbors === 3) draftGrid[i][j] = 1;

          }
        }
      })
    })

    // Invoke next step
    setStep(stepRef.current += 1);
    setTimeout(runSimulation, stepTimeout);
  }, [])

  const stopSimulation = useCallback(() => {

    setGrid(createEmptyGrid());
    setStep(0);

  }, []);

  return (
    <div id="main">
      <div className="controls">
        <button
          onClick={() => {
            if (gameState === GameState.Running)
              setGameState(GameState.Stopped);
            else setGameState(GameState.Running)
          }}
        >
          {gameState === GameState.Stopped ? 'Start' :
            gameState === GameState.Paused ? 'Resume' : 'Stop'}
        </button>
        <button disabled={gameState === GameState.Paused || gameState === GameState.Stopped}
          onClick={() => {
            setGameState(GameState.Paused);
          }}
        >
          Pause
      </button>
        <button disabled={gameState !== GameState.Stopped}
          onClick={() => setGrid(createRandomGrid())}>
          Randomize
      </button>
        <pre>Current step: {step}</pre>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}>
        {grid.map((row, i) =>
          row.map((col, j) =>
            <div
              key={`${i}-${j}`} // Unique key based on cell position
              onClick={() => { // Toggle cell on click
                const newGrid = produce(grid, draftGrid => {
                  draftGrid[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20, height: 20,
                backgroundColor: grid[i][j] === 1 ? 'lightskyblue' : 'white',
                border: 'solid 1px black'
              }}>

            </div>))}
      </div>
    </div>
  )
}

export default App;
