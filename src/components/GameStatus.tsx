
interface GameStatusProps {
  message: string;
  playerTurn: boolean;
  isGameStarted: boolean;
}

export const GameStatus: React.FC<GameStatusProps> = ({ message, playerTurn, isGameStarted }) => {
  return (
    <div className="mb-8">
      <div className="text-center bg-gray-100 p-4 rounded-md shadow-sm">
        <p className="text-lg font-medium">{message}</p>
        
        {isGameStarted && (
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className={`h-3 w-3 rounded-full ${playerTurn ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <p className={playerTurn ? 'font-medium' : 'text-gray-500'}>
              {playerTurn ? 'Ваш ход' : 'Ход компьютера'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
