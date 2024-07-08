import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
	const rows = 15;
	const cols = 20;

	const [grid, setGrid] = useState(
		Array(rows).fill().map(() => Array(cols).fill({ color: '#222', value: 0 }))
	);

	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setGrid(prevGrid => {
				const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell })));

				for (let col = 0; col < cols; col++) {
					let startNewColor = true;

					for (let row = rows - 1; row >= 0; row--) {
						if (newGrid[row][col].value > 0) {
							startNewColor = false;
							if (newGrid[row][col].value < 5) {
								newGrid[row][col] = { color: newGrid[row][col].color, value: newGrid[row][col].value + 1 };
							} else {
								newGrid[row][col] = { color: newGrid[row][col].color, value: 0 };
							}
						} else if (row > 0 && newGrid[row - 1][col].value > 0) {
							newGrid[row][col] = { color: newGrid[row - 1][col].color, value: newGrid[row - 1][col].value };
						} else if (row === 0 && startNewColor) {
							if (Math.random() < 0.1) {
								newGrid[row][col] = { color: getRandomColor(), value: 1 };
							}
						}
					}
				}

				return newGrid;
			});
		}, 200);

		return () => clearInterval(interval);
	}, []);

	const getColorStyle = (cell) => {
		if (cell.value === 0) return cell.color;
		const alpha = Math.min(cell.value / 5, 1);
		return `${cell.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
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
								style={{ backgroundColor: getColorStyle(cell) }}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
