import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMachineById } from "../api";
import { FiArrowLeft } from "react-icons/fi";

export default function MachineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [machine, setMachine] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getMachineById(id);
      setMachine(data);

      if (data.images && data.images.length > 0) {
        setActiveImage(data.images[0]);
      }
    } catch (err) {
      console.log("讀取機台資料失敗", err);
    }
  }

  if (!machine) {
    return (
      <div className="text-center text-gray-300 mt-20">
        載入中...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkbg text-gray-200 pb-24">
      {/* 返回按鈕 */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <FiArrowLeft className="text-xl" /> 返回
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ========================= */}
        {/* 左邊：圖片 + 3D 模型 */}
        {/* ========================= */}
        <div className="space-y-6">
          {/* 主圖片 */}
          <div className="bg-black/40 border border-darkborder rounded-xl h-[420px] flex items-center justify-center overflow-hidden">
            {activeImage ? (
              <img src={activeImage} className="h-full w-full object-cover" />
            ) : (
              <p className="text-gray-500">無圖片</p>
            )}
          </div>

          {/* 縮圖 */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {(machine.images || []).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`h-20 w-28 rounded-lg overflow-hidden border ${
                  activeImage === img
                    ? "border-blue-500"
                    : "border-gray-700 hover:border-gray-400"
                }`}
              >
                <img src={img} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          {/* ========================= */}
          {/* ⭐ 3D 模型展示區 */}
          {/* ========================= */}
          {machine.model3dUrl && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">3D 模型展示</h2>
              <div className="bg-black/40 border border-darkborder rounded-xl h-[420px] overflow-hidden">
                {/* 自訂 Web Component：<model-viewer> */}
                <model-viewer
                  src={machine.model3dUrl}
                  camera-controls
                  auto-rotate
                  disable-zoom="false"
                  style={{ width: "100%", height: "100%" }}
                  exposure="1"
                  shadow-intensity="1"
                  environment-image="neutral"
                >
                </model-viewer>
              </div>
              <p className="text-center text-gray-400 text-sm mt-2">
                拖曳模型可旋轉，滑動可縮放。
              </p>
            </div>
          )}
        </div>

        {/* ========================= */}
        {/* 右邊：商品資訊 */}
        {/* ========================= */}
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-3">
            {machine.name}
          </h1>

          <p className="text-gray-400 text-lg mb-6">
            型號：{machine.model || "—"}
          </p>

          <p className="text-primary text-3xl font-bold mb-6">
            NT$ {machine.price?.toLocaleString() || "-"}
          </p>

          <div className="bg-darkcard border border-darkborder rounded-xl p-6 space-y-4 shadow-lg">
            <h3 className="text-xl font-bold text-white">基本資訊</h3>
            <div className="grid grid-cols-2 gap-y-3 text-gray-300">
              <div className="text-gray-400">功率</div>
              <div>{machine.power || "-"}</div>

              <div className="text-gray-400">地區</div>
              <div>{machine.location || "-"}</div>

              <div className="text-gray-400">建立日期</div>
              <div>{machine.createdAt ? new Date(machine.createdAt).toLocaleDateString() : "-"}</div>
            </div>
          </div>

          <div className="bg-darkcard border border-darkborder rounded-xl p-6 mt-8 shadow-lg">
            <h3 className="text-xl font-bold mb-3">描述</h3>
            <p className="text-gray-300 leading-relaxed">
              {machine.description || "（無描述）"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


