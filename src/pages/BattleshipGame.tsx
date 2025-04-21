
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { BattleGrid } from '../components/BattleGrid';
import { GameStatus } from '../components/GameStatus';

const BattleshipGame = () => {
  const [playerGrid, setPlayerGrid] = useState<number[][]>(Array(10).fill(0).map(() => Array(10).fill(0)));
  const [computerGrid, setComputerGrid] = useState<number[][]>(Array(10).fill(0).map(() => Array(10).fill(0)));
  const [playerShots, setPlayerShots] = useState<number[][]>(Array(10).fill(0).map(() => Array(10).fill(0)));
  const [computerShots, setComputerShots] = useState<number[][]>(Array(10).fill(0).map(() => Array(10).fill(0)));
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameMessage, setGameMessage] = useState('Добро пожаловать в Морской бой!');
  const [playerTurn, setPlayerTurn] = useState(true);

  // Инициализация компьютерной сетки случайными кораблями
  const initializeComputerGrid = () => {
    const newGrid = Array(10).fill(0).map(() => Array(10).fill(0));
    
    // Разместим 1 корабль размером 4 клетки
    placeRandomShip(newGrid, 4);
    
    // Разместим 2 корабля размером 3 клетки
    placeRandomShip(newGrid, 3);
    placeRandomShip(newGrid, 3);
    
    // Разместим 3 корабля размером 2 клетки
    placeRandomShip(newGrid, 2);
    placeRandomShip(newGrid, 2);
    placeRandomShip(newGrid, 2);
    
    setComputerGrid(newGrid);
  };

  // Функция для случайного размещения корабля
  const placeRandomShip = (grid: number[][], size: number) => {
    let placed = false;
    
    while (!placed) {
      const horizontal = Math.random() > 0.5;
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      
      if (canPlaceShip(grid, row, col, size, horizontal)) {
        placeShip(grid, row, col, size, horizontal);
        placed = true;
      }
    }
  };

  // Проверка, можно ли разместить корабль
  const canPlaceShip = (grid: number[][], row: number, col: number, size: number, horizontal: boolean) => {
    // Проверка выхода за границы
    if (horizontal) {
      if (col + size > 10) return false;
    } else {
      if (row + size > 10) return false;
    }
    
    // Проверка на пересечения с другими кораблями (включая диагонали)
    for (let i = -1; i <= size; i++) {
      for (let j = -1; j <= 1; j++) {
        let r = horizontal ? row + j : row + i;
        let c = horizontal ? col + i : col + j;
        
        if (r >= 0 && r < 10 && c >= 0 && c < 10) {
          if (i >= 0 && i < size) {
            if (horizontal && j === 0 && grid[r][c] === 1) return false;
            if (!horizontal && j === 0 && grid[r][c] === 1) return false;
          } else if (grid[r][c] === 1) {
            return false;
          }
        }
      }
    }
    
    return true;
  };

  // Размещение корабля на сетке
  const placeShip = (grid: number[][], row: number, col: number, size: number, horizontal: boolean) => {
    for (let i = 0; i < size; i++) {
      if (horizontal) {
        grid[row][col + i] = 1;
      } else {
        grid[row + i][col] = 1;
      }
    }
  };

  // Обработка клика по ячейке компьютера
  const handlePlayerShot = (row: number, col: number) => {
    if (!isGameStarted || !playerTurn || playerShots[row][col] !== 0) return;
    
    const newPlayerShots = [...playerShots];
    
    if (computerGrid[row][col] === 1) {
      newPlayerShots[row][col] = 2; // Попадание
      setGameMessage('Попадание!');
    } else {
      newPlayerShots[row][col] = 1; // Промах
      setGameMessage('Промах!');
      setPlayerTurn(false);
      
      // Ход компьютера через небольшую задержку
      setTimeout(() => {
        computerTurn();
      }, 1000);
    }
    
    setPlayerShots(newPlayerShots);
    
    // Проверка на победу
    if (checkVictory(newPlayerShots, computerGrid)) {
      setGameMessage('Вы победили! 🎉');
      setIsGameStarted(false);
    }
  };

  // Ход компьютера
  const computerTurn = () => {
    let row, col;
    let validShot = false;
    
    // Компьютер выбирает случайную ячейку, по которой еще не стрелял
    while (!validShot) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      
      if (computerShots[row][col] === 0) {
        validShot = true;
      }
    }
    
    const newComputerShots = [...computerShots];
    
    if (playerGrid[row][col] === 1) {
      newComputerShots[row][col] = 2; // Попадание
      setGameMessage('Компьютер попал!');
    } else {
      newComputerShots[row][col] = 1; // Промах
      setGameMessage('Компьютер промахнулся!');
      setPlayerTurn(true);
    }
    
    setComputerShots(newComputerShots);
    
    // Проверка на победу компьютера
    if (checkVictory(newComputerShots, playerGrid)) {
      setGameMessage('Компьютер победил! 😔');
      setIsGameStarted(false);
    }
  };

  // Проверка на победу
  const checkVictory = (shots: number[][], targetGrid: number[][]) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (targetGrid[i][j] === 1 && shots[i][j] !== 2) {
          return false;
        }
      }
    }
    return true;
  };

  // Размещение кораблей игрока (для демо используем случайное размещение)
  const placePlayerShips = () => {
    const newGrid = Array(10).fill(0).map(() => Array(10).fill(0));
    
    placeRandomShip(newGrid, 4);
    placeRandomShip(newGrid, 3);
    placeRandomShip(newGrid, 3);
    placeRandomShip(newGrid, 2);
    placeRandomShip(newGrid, 2);
    placeRandomShip(newGrid, 2);
    
    setPlayerGrid(newGrid);
  };

  // Начало игры
  const startGame = () => {
    setPlayerShots(Array(10).fill(0).map(() => Array(10).fill(0)));
    setComputerShots(Array(10).fill(0).map(() => Array(10).fill(0)));
    placePlayerShips();
    initializeComputerGrid();
    setGameMessage('Игра началась! Ваш ход.');
    setPlayerTurn(true);
    setIsGameStarted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Морской бой</h1>
      
      <GameStatus message={gameMessage} playerTurn={playerTurn} isGameStarted={isGameStarted} />
      
      <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2 text-center">Ваша доска</h2>
          <BattleGrid 
            grid={playerGrid} 
            shots={computerShots} 
            onCellClick={() => {}} 
            showShips={true}
          />
        </div>
        
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2 text-center">Доска противника</h2>
          <BattleGrid 
            grid={computerGrid} 
            shots={playerShots} 
            onCellClick={handlePlayerShot} 
            showShips={false}
          />
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          className="px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md transition-colors"
          onClick={startGame}
          disabled={isGameStarted}
        >
          {isGameStarted ? 'Идет игра...' : 'Начать игру'}
        </Button>
      </div>
    </div>
  );
};

export default BattleshipGame;
