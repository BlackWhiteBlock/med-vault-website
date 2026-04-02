import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Maximize2, Download, Share2 } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MOCK_DOCUMENTS = [
  {
    id: "doc1",
    date: "2024-03-10",
    hospital: "省级三甲医院",
    url: "https://images.unsplash.com/photo-1618229745783-20e7b07793e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYmxvb2QlMjB0ZXN0JTIwcmVwb3J0JTIwZG9jdW1lbnR8ZW58MXx8fHwxNzczNDY5ODUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "血常规报告"
  },
  {
    id: "doc2",
    date: "2024-02-20",
    hospital: "市第一人民医院",
    url: "https://images.unsplash.com/photo-1620933967796-53cc2b175b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFiJTIwcmVzdWx0JTIwcGFwZXJ8ZW58MXx8fHwxNzczNDY5ODU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "血常规报告"
  },
  {
    id: "doc3",
    date: "2024-01-10",
    hospital: "市中心医院",
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzczNDY5ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "血常规报告"
  }
];

export default function DocumentViewerPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const currentDoc = MOCK_DOCUMENTS[currentIndex];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      {/* Dark Theme Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center bg-slate-900 rounded-full text-slate-300 active:scale-95 transition-transform"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">原件影像</h1>
            <p className="text-xs text-slate-400">
              {currentIndex + 1} / {MOCK_DOCUMENTS.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center text-slate-300 active:scale-95 transition-transform">
            <Download size={18} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-slate-300 active:scale-95 transition-transform">
            <Share2 size={18} />
          </button>
        </div>
      </header>

      {/* Main Viewer Area */}
      <div className="flex-1 flex flex-col justify-center pb-8">
        <Slider {...sliderSettings} className="w-full">
          {MOCK_DOCUMENTS.map((doc) => (
            <div key={doc.id} className="outline-none h-[65vh] px-4 flex items-center justify-center">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-slate-900 flex items-center justify-center group">
                <img 
                  src={doc.url} 
                  alt={`Report from ${doc.hospital}`} 
                  className="w-full h-full object-contain"
                />
                <button className="absolute bottom-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </Slider>

        {/* Metadata Footer */}
        <div className="px-6 mt-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-bold text-lg">{currentDoc.type}</h2>
              <span className="text-blue-400 font-bold bg-blue-500/10 px-3 py-1 rounded-lg text-sm">
                {currentDoc.date}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {currentDoc.hospital}
              </span>
              <span>·</span>
              <span>AI 已提取数据</span>
            </div>
          </div>
          
          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {MOCK_DOCUMENTS.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-6 bg-blue-500" : "w-1.5 bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
