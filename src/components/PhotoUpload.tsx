import { useState } from 'react';
import { Upload, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PhotoUploadProps {
  onPhotoUploaded: () => void;
}

export default function PhotoUpload({ onPhotoUploaded }: PhotoUploadProps) {
  const [guestName, setGuestName] = useState('');
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('La imagen es muy grande. Máximo 10MB.');
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim() || !file) {
      setError('Por favor completa todos los campos y selecciona una imagen');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('party-photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('party-photos')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('party_photos')
        .insert([{
          guest_name: guestName,
          photo_url: publicUrl,
          caption: caption || null,
        }]);

      if (dbError) throw dbError;

      setUploaded(true);
      setGuestName('');
      setCaption('');
      setFile(null);
      setPreview(null);

      onPhotoUploaded();

      setTimeout(() => setUploaded(false), 5000);
    } catch (err) {
      console.error('Error uploading photo:', err);
      setError('Error al subir la foto. Intenta de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-8">
          <ImageIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Comparte tus Fotos
          </h2>
          <p className="text-gray-600">
            Sube las mejores fotos de la fiesta
          </p>
        </div>

        {uploaded ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-xl text-gray-700 font-semibold">
              ¡Foto subida exitosamente!
            </p>
            <p className="text-gray-600 mt-2">
              Gracias por compartir este momento
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="photo-name" className="block text-lg font-medium text-gray-700 mb-2">
                Tu nombre
              </label>
              <input
                type="text"
                id="photo-name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="¿Quién sube esta foto?"
              />
            </div>

            <div>
              <label htmlFor="caption" className="block text-lg font-medium text-gray-700 mb-2">
                Descripción (opcional)
              </label>
              <input
                type="text"
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Agrega un comentario a la foto"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Selecciona una foto
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all bg-gray-50 hover:bg-gray-100"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Haz clic para seleccionar una foto</p>
                      <p className="text-sm text-gray-500 mt-1">Máximo 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {isUploading ? 'Subiendo...' : 'Subir Foto'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
