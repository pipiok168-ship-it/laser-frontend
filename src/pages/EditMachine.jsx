import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMachineById } from "../api";
import { FiArrowLeft } from "react-icons/fi";

export default function MachineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [machine, setMachine] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3D 模型旋轉（圖片序列）
  const imgRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [lastX, setLastX] = useState(0);

  useEffect(() => {
    fetchMachineById(id).then((res) => setMachine(res.data));
  }, [id]);

  if (!machine) return <div className="text-white p-6">讀取中...</div>;

  const images = machine.images || [];

  // 3D 滑鼠拖曳旋轉
  const handleMouseDown = (e) => {
    setDragging(true);
    setLastX(e.clientX);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const diff = e.clientX - lastX;

    if (Math.abs(diff) > 8) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      setLastX(e.clientX);
    }
  };

  return (
    <div className="min-h-screen bg-darkbg text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-300 hover:text-white mb-4"
      >
        <FiArrowLeft className="mr-2" /> 返回
      </button>

      <h1 className="text-3xl font-bold mb-6">{machine.name}</h1>

      {/* 3D 圖片展示 */}
      {images.length > 0 && (
        <div className="flex justify-center mb-6">
          <img
            ref={imgRef}
            src={images[currentIndex]}
            alt="3D"
            className="w-96 h-96 object-contain rounded-lg bg-black/30 p-4 cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            draggable="false"
          />
        </div>
      )}

      {/* 詳細資訊 */}
      <div className="bg-darkcard p-6 rounded-xl shadow-lg border border-darkborder max-w-2xl mx-auto space-y-4">
        <p><span className="font-semibold">名稱：</span>{machine.name}</p>
        <p><span className="font-semibold">型號：</span>{machine.model}</p>
        <p><span className="font-semibold">功率：</span>{machine.power}</p>
        <p><span className="font-semibold">價格：</span>NT$ {machine.price}</p>
        <p><span className="font-semibold">地區：</span>{machine.location}</p>
        <p><span className="font-semibold">描述：</span>{machine.description}</p>
      </div>

      {/* 縮圖列表 */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-6 justify-center flex-wrap">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`w-20 h-20 rounded cursor-pointer border ${
                currentIndex === index
                  ? "border-primary shadow-lg"
                  : "border-gray-600"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
