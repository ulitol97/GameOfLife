

## Conway's Game of Life

**Demo: https://ulitol97.github.io/Game-of-Life/**

![GameOfLifeDemo](https://user-images.githubusercontent.com/35763574/94534000-324cf980-0240-11eb-9a0a-53245e2b1585.gif)


### What is this?

This is a simple recreation of Conway's "Game of Life" using React functional components + hooks.

**It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.**

### Game rules

In this implementation we'll have a limited-size grid, each cell being in one of two states: alive (colored) or dead (empty).

Each cell interacts with its eight neighbours such that at each step in time, the following transitions take place:

- Any live cell with fewer than two live neighbours dies, as if by underpopulation.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
- All other dead cells stay dead.

### Additional controls

The player can interact with the automaton at any time before starting the simulation or during the simulation by:
1) Pausing the game
2) Clicking on any cell. Dead cells will come to life and alive cells will die ([common cell patterns](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns)).

The initial grid can be randomized as well.


## Running the project locally

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), so refer to the link for more information on how to run and edit it.
