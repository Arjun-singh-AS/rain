import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const rows = 20;
  const cols = 20;

  // Initialize the grid with black cells
  const [grid, setGrid] = useState(
    Array(rows).fill().map(() => Array(cols).fill({ color: '#222', value: 0 }))
  );

  // Store the interval ID to clear it when a new cell is clicked
  const intervalRef = useRef(null);

  const gridTask = (row, col) => {
    // Clear the previous interval if there is one
    setGrid(Array(rows).fill().map(() => Array(cols).fill({ color: '#222', value: 0 })));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let t = 0;
    intervalRef.current = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => row.map((cell) => ({ ...cell })));

        let left = col - t, up = row - t, down = row + t, right = col + t;
        // let prevLeft = col - t + 1, prevUp = row - t + 1, prevDown = row + t - 1, prevRight = col + t - 1;
         
        // // Reset the previous boundary to black
        // if (prevUp >= 0) {
        //   for (let i = Math.max(0, prevLeft); i <= Math.min(cols - 1, prevRight); i++) {
        //     newGrid[prevUp][i] = { color: '#222', value: 0 };
        //   }
        // }

        // if (prevDown < rows) {
        //   for (let i = Math.max(0, prevLeft); i <= Math.min(cols - 1, prevRight); i++) {
        //     newGrid[prevDown][i] = { color: '#222', value: 0 };
        //   }
        // }

        // if (prevLeft >= 0) {
        //   for (let i = Math.max(0, prevUp); i <= Math.min(rows - 1, prevDown); i++) {
        //     newGrid[i][prevLeft] = { color: '#222', value: 0 };
        //   }
        // }

        // if (prevRight < cols) {
        //   for (let i = Math.max(0, prevUp); i <= Math.min(rows - 1, prevDown); i++) {
        //     newGrid[i][prevRight] = { color: '#222', value: 0 };
        //   }
        // }

        // // Reset the initially clicked cell after the first interval
        // if (t > 0) {
        //   newGrid[row][col] = { color: '#222', value: 0 };
        // }

        for(let i=0;i<20;i++){
          for(let j=0;j<20;j++){
            newGrid[i][j] = { color: '#222', value: 0 };
          }
        }
        // Set the current boundary to blue
        if (up >= 0) {
          for (let i = Math.max(0, left); i <= Math.min(cols - 1, right); i++) {
            newGrid[up][i] = { color: "blue", value: 1 };
          }
        }

        if (down < rows) {
          for (let i = Math.max(0, left); i <= Math.min(cols - 1, right); i++) {
            newGrid[down][i] = { color: "blue", value: 1 };
          }
        }

        if (left >= 0) {
          for (let i = Math.max(0, up); i <= Math.min(rows - 1, down); i++) {
            newGrid[i][left] = { color: "blue", value: 1 };
          }
        }

        if (right < cols) {
          for (let i = Math.max(0, up); i <= Math.min(rows - 1, down); i++) {
            newGrid[i][right] = { color: "blue", value: 1 };
          }
        }

        return newGrid;
      });

      t = (t + 1) % Math.max(rows, cols); // Reset t periodically to keep the effect looping
    }, 100); // Adjust interval for animation speed
  };

  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                onClick={() => gridTask(rowIndex, colIndex)}
                style={{ backgroundColor: cell.color }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
