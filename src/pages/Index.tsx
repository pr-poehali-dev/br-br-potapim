
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Добро пожаловать!</h1>
      
      <div className="flex flex-col items-center">
        <Link to="/battleship">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium">
            Играть в Морской бой
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
