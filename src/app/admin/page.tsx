"use client";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [guests, setGuests] = useState<any[]>([]);

  const USER = "FeliJona";
  const PASS = "706576";

  useEffect(() => {
    if (isAuthenticated) {
      const saved = JSON.parse(localStorage.getItem("rsvps") || "[]");
      setGuests(saved);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === USER && passwordInput === PASS) {
      setIsAuthenticated(true);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const exportToExcel = () => {
    if (guests.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    // Convertimos los datos
    const worksheet = XLSX.utils.json_to_sheet(
      guests.map((g) => ({
        Nombre: g.nombre,
        Asistirá: g.asistira ? "Sí" : "No",
        Fecha: new Date(g.creado_en).toLocaleString("es-AR"),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invitados");

    // Genera y descarga el archivo
    XLSX.writeFile(workbook, "invitados.xlsx");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Acceso Administrador
          </h2>
          <input
            type="text"
            placeholder="Usuario"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="w-full mb-4 px-4 py-3 border rounded-lg focus:ring focus:ring-blue-200"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full mb-6 px-4 py-3 border rounded-lg focus:ring focus:ring-blue-200"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Lista de Invitados Confirmados 🎉
      </h1>

      {guests.length === 0 ? (
        <p className="text-center text-gray-600">
          Aún no hay confirmaciones registradas.
        </p>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={exportToExcel}
              className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              📥 Exportar a Excel
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-3 px-4 text-left">Nombre</th>
                  <th className="py-3 px-4 text-left">Asistirá</th>
                  <th className="py-3 px-4 text-left">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((g, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{g.nombre}</td>
                    <td className="py-3 px-4">
                      {g.asistira ? (
                        <span className="text-green-600 font-semibold">
                          Sí
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          No
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm">
                      {new Date(g.creado_en).toLocaleString("es-AR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
