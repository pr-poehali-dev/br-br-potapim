
import React from 'react';

interface BattleGridProps {
  grid: number[][];
  shots: number[][];
  onCellClick: (row: number, col: number) => void;
  showShips: boolean;
}

export const BattleGrid: React.FC<BattleGridProps> = ({ grid, shots, onCellClick, showShips }) => {
  const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
  
  const getCellClass = (row: number, col: number) => {
    // Попадание
    if (shots[row][col] === 2) {
      return 'bg-red-500 hover:bg-red-600';
    }
    // Промах
    if (shots[row][col] === 1) {
      return 'bg-blue-300 hover:bg-blue-400';
    }
    // Корабль (показывать только на доске игрока)
    if (showShips && grid[row][col] === 1) {
      return 'bg-gray-500 hover:bg-gray-600';
    }
    // Пустая ячейка
    return 'bg-blue-100 hover:bg-blue-200';
  };

  const getCellContent = (row: number, col: number) => {
    if (shots[row][col] === 2) {
      return '💥';
    }
    if (shots[row][col] === 1) {
      return '•';
    }
    return '';
  };

  return (
    <div className="select-none">
      <div className="grid grid-cols-11 gap-1">
        {/* Верхняя строка с буквами */}
        <div className="h-8 flex items-center justify-center"></div>
        {letters.map((letter, index) => (
          <div key={`header-${index}`} className="h-8 flex items-center justify-center font-bold">
            {letter}
          </div>
        ))}
        
        {/* Основная сетка */}
        {Array(10).fill(0).map((_, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {/* Номер строки */}
            <div className="h-8 w-8 flex items-center justify-center font-bold">
              {rowIndex + 1}
            </div>
            
            {/* Ячейки */}
            {Array(10).fill(0).map((_, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className={`h-8 w-8 flex items-center justify-center border border-gray-300 cursor-pointer transition-colors ${getCellClass(rowIndex, colIndex)}`}
                onClick={() => onCellClick(rowIndex, colIndex)}
              >
                {getCellContent(rowIndex, colIndex)}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
