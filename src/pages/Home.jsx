import React, { useEffect, useState } from "react";
import { getMachines } from "../api";

export default function Home() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    getMachines().then((res) => setMachines(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Laser Market</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map((m) => {
          const thumb = m.thumbs?.[0] || m.images?.[0] || "";

          return (
            <a
              href={`/detail/${m.id}`}
              key={m.id}
              className="bg-[#111] border border-[#222] rounded-xl overflow-hidden hover:border-[#00b4ff] transition"
            >
              <div className="h-48 w-full bg-black">
                {thumb && (
                  <img
                    src={thumb}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>

              <div className="p-4">
                <div className="font-semibold text-lg">{m.name}</div>
                <div className="text-gray-400 text-sm">{m.model}</div>
                <div className="text-[#00b4ff] font-semibold mt-2">
                  {m.price ? `NT$ ${m.price}` : "洽詢"}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

