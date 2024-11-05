import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const rows = 15;
  const cols = 20;

  // Initialize the grid with black cells
  const [grid, setGrid] = useState(
    Array(rows).fill().map(() => Array(cols).fill({ color: '#222', value: 0 }))
  );

  // State to store the current base color for the raindrops
  const [currentColor, setCurrentColor] = useState(getRandomColor());

  // Function to generate a random color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }

  // Function to convert RGB to hex
  function rgbToHex(r, g, b) {
    const componentToHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
  }

  // Function to create fading colors
  function generateFadingColors(baseColor, steps = 6) {
    const { r, g, b } = hexToRgb(baseColor);
    const colors = [];

    for (let i = 0; i < steps; i++) {
      const factor = 1 - (i * 0.15); // Adjust the factor for more/less fading
      const newR = Math.min(255, Math.floor(r * factor));
      const newG = Math.min(255, Math.floor(g * factor));
      const newB = Math.min(255, Math.floor(b * factor));

      // Convert back to hex and add to the list
      colors.push(rgbToHex(newR, newG, newB));
    }
    colors.reverse()
    return colors;
  }

  useEffect(() => {
    // Change the current base color every 3 seconds and generate fading colors
    const colorInterval = setInterval(() => {
      setCurrentColor(getRandomColor());
    }, 3000);

    return () => clearInterval(colorInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => row.map((cell) => ({ ...cell })));
  
        for (let col = 0; col < cols; col++) {
          // Move raindrops down the column
          for (let row = rows - 1; row >= 0; row--) {
            if (newGrid[row][col].value > 0) {
              // Check if we can move the raindrop down
              if (row < rows - 1 && newGrid[row + 1][col].value === 0) {
                // Move the drop down
                newGrid[row + 1][col] = { 
                  color: newGrid[row][col].color, 
                  value: 1 
                };
                // Clear the current position
                newGrid[row][col] = { color: '#222', value: 0 }; 
              }
              if(row==rows-1){
                newGrid[row][col] = { color: '#222', value: 0 };
              }
            }
            
          }

  
          // Introduce a new raindrop at the top with a certain probability
          if (Math.random() < 0.02 && newGrid[0][col].value === 0) {
            const fadingColors = generateFadingColors(currentColor, 6);
            // Fill the top 6 rows with fading colors
            for (let i = 0; i < 6; i++) {
              if (i < rows) {
                newGrid[i][col] = { color: fadingColors[i], value: 1 };
              }
            }
          }
  
        }
  
        return newGrid;
      });
    }, 100); // Adjust interval for animation speed
  
    return () => clearInterval(interval);
  }, [currentColor]);
  
  
  

  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
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
