import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const targetDate = new Date('2025-10-22T00:00:00');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        Cuenta Regresiva
      </h2>
      <div className="grid grid-cols-4 gap-4 md:gap-8">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-center transform transition-transform hover:scale-105">
          <div className="text-4xl md:text-6xl font-bold text-blue-600 mb-2">
            {timeLeft.days}
          </div>
          <div className="text-sm md:text-base text-gray-600 uppercase tracking-wide">
            Días
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-center transform transition-transform hover:scale-105">
          <div className="text-4xl md:text-6xl font-bold text-green-600 mb-2">
            {timeLeft.hours}
          </div>
          <div className="text-sm md:text-base text-gray-600 uppercase tracking-wide">
            Horas
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-center transform transition-transform hover:scale-105">
          <div className="text-4xl md:text-6xl font-bold text-yellow-600 mb-2">
            {timeLeft.minutes}
          </div>
          <div className="text-sm md:text-base text-gray-600 uppercase tracking-wide">
            Minutos
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-center transform transition-transform hover:scale-105">
          <div className="text-4xl md:text-6xl font-bold text-red-600 mb-2">
            {timeLeft.seconds}
          </div>
          <div className="text-sm md:text-base text-gray-600 uppercase tracking-wide">
            Segundos
          </div>
        </div>
      </div>
    </div>
  );
}
