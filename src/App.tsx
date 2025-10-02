import { useEffect, useState, useCallback } from 'react';
import { PartyPopper } from 'lucide-react';
import Countdown from './components/Countdown';
import CalendarButton from './components/CalendarButton';
import PhotoGallery from './components/PhotoGallery';
import SectionPortada from "./components/SectionPortada";
import { Helmet } from 'react-helmet';



function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [galleryKey, setGalleryKey] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  
  return (
    <div className="min-h-screen ">
      <Helmet>
        <title>Felipe cumple 5 años</title>
        <meta property="og:title" content="¡Estás invitado a mi cumple!" />
        <meta property="og:description" content="Vení a celebrar con nosotros este día tan especial 🎉" />
        <meta property="og:image" content="/img/portadafeliwtp.png" />
        <meta property="og:url" content="https://cumple-feli.netlify.app/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div
        className={`transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <section className="relative w-full">
          <SectionPortada />
            

          <div className="bg-black/95 rounded-2xl shadow-xl relative z-10">


            <div className="bg-white/95 backdrop-blur-sm px-4 py-1 md:py-16">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8 inline-block animate-bounce">
                  <PartyPopper className="mt-[-110px] w-16 h-16 md:w-20 md:h-20 text-yellow-500" />
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Felipe cumple 5 años
                </h1>

                <div className="space-y-4 text-gray-700">
                  <p className="text-2xl md:text-3xl font-semibold">
                    ¡Estás invitado a mi fiesta!
                  </p>
                  <div className="flex items-center justify-center gap-4 text-lg md:text-xl">
                    <span className="font-medium">📅 22 de Octubre, 2025</span>
                  </div>
                  <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                    Vení a celebrar con nosotros este día tan especial. Tendrémos juegos, música, y mucha diversión.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/70 backdrop-blur-sm">
          <Countdown />
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 mb-2">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 md:p-12 text-white shadow-xl text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Detalles del Evento
              </h3>
              <div className="space-y-3 text-lg md:text-xl">
                <p>
                  <strong>Fecha:</strong> Miércoles, 22 de Octubre de 2025
                </p>
                <p>
                  <strong>Hora:</strong> 17:00 - 20:00
                </p>
                <p>
                  <strong>Lugar:</strong> Cura Alvarez 161 (Refugio Eventos)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Botón para confirmar*/}
        <div className="flex justify-center mt-[-20] px-4">
            <button
              onClick={() => window.open("https://forms.gle/iMfCuvzhrQQEtKoB9", "_blank")}
              className="shadow-xl bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl text-white px-20 py-5 rounded-lg hover:bg-blue-700 transition"
            >
              CONFIRMAR ASISTENCIA
            </button>
        </div>

        <section className="py-16">
          <CalendarButton />
        </section>

        <section className="py-16 bg-white/70 backdrop-blur-sm mt-[-60px]">
          <PhotoGallery key={galleryKey} />
        </section>

        
                
          
        

        {/* Upload Section 
        <section className="py-16">
          <PhotoUpload onPhotoUploaded={handlePhotoUploaded} />
        </section>
        */}

        <footer className="py-12 text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <PartyPopper className="w-12 h-12 mx-auto mb-4" />
            <p className="text-xl md:text-2xl font-semibold mb-2">
              ¡Nos vemos en la fiesta!
            </p>
            <p className="text-blue-100">
              Para más información, contáctanos
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
