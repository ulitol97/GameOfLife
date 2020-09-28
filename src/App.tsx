import produce from 'immer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GithubPicker } from 'react-color';
import ReactTooltip from "react-tooltip";


// CONFIG
const cellSizePx = 20;
// Number of rows and cols determined by initial client windows size
const numRows = Math.min(Math.floor(window.innerHeight * 0.7 / cellSizePx - 1), 500);
const numCols = Math.min(Math.floor(window.innerWidth * 0.9 / cellSizePx), 500);
const stepTimeout = 250;
const defaultRandomizeProbability = 0.5;
const defaultColor = {
  r: 18,
  g: 115,
  b: 222,
  a: 1
}

const minimumStep = 100;
const maximumStep = 20000;

const minimumProbability = 0;
const maximumProbability = 1;

// Function to create the template grid data structure
const createGrid = (aliveProbability?: number) => {
  const rows = [];

  if (aliveProbability) {
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => Math.random() >= (1 - aliveProbability) ? 1 : 0));
    }
  }
  else {
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
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
  const [grid, setGrid] = useState(() => { return createGrid() });
  const [gameState, setGameState] = useState(GameState.Stopped);
  const [step, setStep] = useState(0);
  const [stepInterval, setStepInterval] = useState(stepTimeout);
  const [randomizeProbability, setRandomizeProbability] = useState(defaultRandomizeProbability);
  const [advancedControls, setAdvancedControls] = useState(false);
  const [colorPicker, setColorPicker] = useState(false);
  const [cellColor, setCellColor] = useState(`rgba(${defaultColor.r}, ${defaultColor.g}, ${defaultColor.b}, ${defaultColor.a})`);


  // Refs
  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;

  const stepRef = useRef(step);
  stepRef.current = step;

  const stepIntervalRef = useRef(stepInterval);
  stepIntervalRef.current = stepInterval;

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
    setTimeout(runSimulation, stepIntervalRef.current);
  }, [])

  const stopSimulation = useCallback(() => {

    setGrid(createGrid());
    setStep(0);

  }, []);

  return (
    <div id="main">
      <div className="upper">
        <div className="controls">
          <div className="form-group">
            <div>
              <button
                onClick={() => {
                  if (gameState === GameState.Stopped) setGameState(GameState.Running)
                  else setGameState(GameState.Stopped)
                }}
              >
                {gameState === GameState.Stopped ? 'Start' : 'Stop'}
              </button>
              <button disabled={gameState === GameState.Stopped}
                onClick={() => {
                  if (gameState !== GameState.Paused) setGameState(GameState.Paused);
                  else setGameState(GameState.Running);
                }}
              >
                {gameState === GameState.Paused ? 'Resume' : 'Pause'}
              </button>
            </div>
            <div>
              <button disabled={gameState !== GameState.Stopped}
                onClick={() => setGrid(createGrid(randomizeProbability))}>
                Randomize
            </button>
              <button disabled={gameState === GameState.Running}
                onClick={() => setGrid(createGrid())}
              >
                Clear
            </button>
            </div>
            <label>
              <input type="checkbox" name="advanced-controls" checked={advancedControls}
                onChange={() => setAdvancedControls(!advancedControls)}
              />
            Show advanced controls
          </label>
          </div>

          {/* Advanced controls */}
          {
            advancedControls && <div className="form-group">
              <div>
                <div className="form-color-picker">
                  <button
                    onClick={() => setColorPicker(!colorPicker)}
                  >
                    Change cell color
                  {
                      colorPicker &&
                      <div className="color-picker">
                        <GithubPicker onChangeComplete={({ rgb }) => setCellColor(
                          `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
                        )} />
                      </div>
                    }
                  </button>
                </div>
                <div>
                  <label>
                    Step interval (ms):
                  <input
                      type="number"
                      min={minimumStep}
                      max={maximumStep}
                      step={50}
                      value={stepInterval}
                      onChange={e => {
                        const step = parseInt(e.target.value);

                        if (step > maximumStep) setStepInterval(maximumStep)
                        else if (step < minimumStep) setStepInterval(minimumStep)
                        else setStepInterval(step)
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label data-tip data-for="probabilityTip">
                    Alive probability:
                  <input
                      type="number"
                      min={minimumProbability}
                      max={maximumProbability}
                      step={0.1}
                      value={randomizeProbability}
                      onChange={e => {
                        const prob = parseFloat(e.target.value);

                        if (prob > maximumProbability) setRandomizeProbability(maximumProbability);
                        else if (prob < minimumProbability) setRandomizeProbability(minimumProbability);
                        else setRandomizeProbability(prob);
                      }}
                    />
                  </label>
                  <ReactTooltip id="probabilityTip" place="bottom" effect="solid">
                    Probability of generating alive cells when randomizing the grid
                </ReactTooltip>
                </div>
              </div>

            </div>
          }


        </div>
        <div className="data">
          <p>Current step: {step}</p>

        </div>
      </div>
      <div id="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, ${cellSizePx}px)`
        }}>
        {grid.map((row, i) =>
          row.map((col, j) =>
            <div
              key={`${i}-${j}`} // Unique key based on cell position
              onClick={() => { // Toggle cell on click
                if (gameState === GameState.Running) return;

                const newGrid = produce(grid, draftGrid => {
                  draftGrid[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20, height: 20,
                backgroundColor: grid[i][j] === 1 ? cellColor : 'white',
                border: 'solid 1px black'
              }}>

            </div>))}
      </div>
    </div >
  )
}

export default App;
