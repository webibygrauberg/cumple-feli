import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function RSVPForm() {
  const [guestName, setGuestName] = useState('');
  const [willAttend, setWillAttend] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim() || willAttend === null) {
      setError('Por favor completa todos los campos');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Recuperar lista actual
      const existing = JSON.parse(localStorage.getItem("rsvps") || "[]");

      // Nuevo invitado
      const newGuest = {
        nombre: guestName,
        asistira: willAttend,
        creado_en: new Date().toISOString(),
      };

      // Guardar en localStorage
      localStorage.setItem("rsvps", JSON.stringify([...existing, newGuest]));

      setSubmitted(true);
      setGuestName('');
      setWillAttend(null);

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError("Ocurrió un error al guardar la confirmación");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Confirmar Asistencia
        </h2>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-xl text-gray-700 font-semibold">
              ¡Gracias por confirmar!
            </p>
            <p className="text-gray-600 mt-2">
              Nos vemos en la fiesta
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                Tu nombre
              </label>
              <input
                type="text"
                id="name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Escribe tu nombre"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-4">
                ¿Podrás asistir?
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setWillAttend(true)}
                  className={`flex-1 py-4 px-6 rounded-lg border-2 font-semibold transition-all transform hover:scale-105 ${
                    willAttend === true
                      ? 'bg-green-500 border-green-500 text-white shadow-lg'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-green-400'
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6 inline mr-2" />
                  Sí, asistiré
                </button>
                <button
                  type="button"
                  onClick={() => setWillAttend(false)}
                  className={`flex-1 py-4 px-6 rounded-lg border-2 font-semibold transition-all transform hover:scale-105 ${
                    willAttend === false
                      ? 'bg-red-500 border-red-500 text-white shadow-lg'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-red-400'
                  }`}
                >
                  <XCircle className="w-6 h-6 inline mr-2" />
                  No podré asistir
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
