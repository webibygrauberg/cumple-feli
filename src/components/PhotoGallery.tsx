import React from 'react';

interface Photo {
  url: string;
  caption: string | null;
  guestName: string | null;
  height: string;
}

export default function PhotoGallery() {
  const photos: Photo[] = [
    { url: '/img/feli-9.jpeg', caption: null, guestName: null, height: 'row-span-2' },
    { url: '/img/feli-8.jpeg', caption: null, guestName: null, height: 'row-span-1' },
    { url: '/img/feli-4.jpeg', caption: null, guestName: null, height: 'row-span-1' },
    { url: '/img/feli-1.jpeg', caption: null, guestName: null, height: 'row-span-2' },
    { url: '/img/feli-5.jpeg', caption: null, guestName: null, height: 'row-span-1' },
    { url: '/img/feli-2.jpeg', caption: null, guestName: null, height: 'row-span-2' },
    { url: '/img/feli-7.jpeg', caption: null, guestName: null, height: 'row-span-1' },
    { url: '/img/feli-6.jpeg', caption: null, guestName: null, height: 'row-span-1' },
  ];

  

  const allPhotos = [...photos,];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
        Galería de Fotos
      </h2>
      <p className="text-center text-gray-600 mb-8 text-lg">
        Momentos especiales de Felipe
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
        {allPhotos.map((photo, index) => (
          <div
            key={index}
            className={`${photo.height} overflow-hidden rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:z-10 group relative`}
          >
            <img
              src={photo.url}
              alt={photo.caption || `Foto ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {photo.caption && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-4 text-white">
                  <p className="font-semibold text-sm">{photo.guestName}</p>
                  <p className="text-xs">{photo.caption}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
