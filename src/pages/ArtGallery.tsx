
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';

const ArtGallery = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Арт Галерея</h1>
      
      <Card className="max-w-3xl mx-auto bg-gradient-to-br from-yellow-100 to-yellow-300">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Деревянный человек с головой акулы в банане</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="relative w-80 h-96">
            {/* Банан */}
            <div className="absolute inset-0 z-0">
              <svg viewBox="0 0 200 300" className="w-full h-full">
                <path d="M50,50 C20,100 20,200 50,250 L150,250 C180,200 180,100 150,50 Z" 
                      fill="#FFE135" stroke="#D9B100" strokeWidth="3" />
              </svg>
            </div>
            
            {/* Деревянный человек */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-4">
              {/* Голова акулы */}
              <div className="relative w-32 h-36 mb-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M30,20 C10,30 5,50 10,70 L50,90 L90,70 C95,50 90,30 70,20 Z" 
                        fill="#7CB9E8" stroke="#0066CC" strokeWidth="2" />
                  <ellipse cx="30" cy="50" rx="5" ry="5" fill="black" />
                  <path d="M60,70 C50,80 30,80 20,70" 
                        fill="none" stroke="#0066CC" strokeWidth="2" />
                  <path d="M50,90 L50,95" fill="none" stroke="#0066CC" strokeWidth="2" />
                </svg>
              </div>
              
              {/* Деревянное тело */}
              <div className="w-16 h-40 rounded-md bg-gradient-to-r from-amber-700 to-amber-500 relative">
                {/* Древесные линии */}
                <div className="absolute inset-0">
                  <svg viewBox="0 0 60 150" className="w-full h-full opacity-40">
                    <path d="M10,10 C30,20 30,40 10,50" fill="none" stroke="#5D4037" strokeWidth="1" />
                    <path d="M50,30 C30,40 30,60 50,70" fill="none" stroke="#5D4037" strokeWidth="1" />
                    <path d="M10,70 C30,80 30,100 10,110" fill="none" stroke="#5D4037" strokeWidth="1" />
                    <path d="M50,90 C30,100 30,120 50,130" fill="none" stroke="#5D4037" strokeWidth="1" />
                  </svg>
                </div>
              </div>
              
              {/* Руки */}
              <div className="absolute top-44 w-full flex justify-between px-4">
                <div className="w-16 h-4 rounded-full bg-gradient-to-r from-amber-700 to-amber-500"></div>
                <div className="w-16 h-4 rounded-full bg-gradient-to-r from-amber-700 to-amber-500"></div>
              </div>
              
              {/* Ноги */}
              <div className="absolute bottom-8 w-full flex justify-center gap-4">
                <div className="w-4 h-16 rounded-full bg-gradient-to-r from-amber-700 to-amber-500"></div>
                <div className="w-4 h-16 rounded-full bg-gradient-to-r from-amber-700 to-amber-500"></div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-center text-gray-700 italic">
            "Необычное сочетание природы, моря и фруктов в одной сюрреалистической композиции"
          </p>
        </CardFooter>
      </Card>
      
      <div className="flex justify-center mt-8">
        <Link to="/">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ArtGallery;
