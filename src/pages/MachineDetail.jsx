import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMachineById } from "../api";

export default function MachineDetail() {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);

  useEffect(() => {
    getMachineById(id).then((res) => setMachine(res.data));
  }, [id]);

  if (!machine) return <div className="p-10">載入中…</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{machine.name}</h1>
      <p className="text-gray-400 mb-6">{machine.model}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {machine.images.map((img, i) => (
          <img key={i} src={img} className="rounded-xl" />
        ))}
      </div>

      <div className="space-y-2 text-gray-300">
        <p>地區：{machine.location}</p>
        <p>功率：{machine.power}</p>
        <p>價格：{machine.price}</p>
      </div>
    </div>
  );
}
