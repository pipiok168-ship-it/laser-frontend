import React, { useEffect, useState } from "react";
import { fetchMachines } from "../api";

export default function Home() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    fetchMachines().then((res) => setMachines(res.data));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-darkbg text-white">
      <h1 className="text-3xl font-bold mb-6">Laser Market — 二手雷射機台</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map((m) => (
          <div
            key={m.id}
            className="bg-darkcard p-4 rounded-lg shadow-md border border-darkborder hover:shadow-neon transition"
          >
            {m.images?.length > 0 && (
              <img
                src={m.images[0]}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}

            <h2 className="text-xl font-bold">{m.name}</h2>
            <p className="text-gray-400">{m.location}</p>
            <p className="text-primary font-bold mt-2">{m.price} 元</p>
          </div>
        ))}
      </div>
    </div>
  );
}
