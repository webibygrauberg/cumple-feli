import { Calendar } from 'lucide-react';

export default function CalendarButton() {
  const handleAddToCalendar = () => {
    const eventDetails = {
      text: 'Cumpleaños de Felipe - 5 años',
      dates: '20251022/20251022',
      details: '¡Ven a celebrar el cumpleaños número 5 de Felipe! Será una fiesta inolvidable.',
      location: 'Ubicación por confirmar',
    };

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetails.text
    )}&dates=${eventDetails.dates}&details=${encodeURIComponent(
      eventDetails.details
    )}&location=${encodeURIComponent(eventDetails.location)}`;

    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={handleAddToCalendar}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
      >
        <Calendar className="w-6 h-6" />
        <span className="text-lg">Agregar al Calendario</span>
      </button>
    </div>
  );
}
