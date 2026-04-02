import React, { useState, useEffect } from "react";
import { Share2, Clock, Shield, Link2, Copy, CheckCircle2, QrCode, Lock, Globe, X, ChevronRight } from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Archive, ARCHIVE_TYPE_LABELS } from "../types";

export default function SharePage() {
  const [archives, setArchives] = useState<Archive[]>([]);
  const [selectedArchives, setSelectedArchives] = useState<string[]>([]);
  const [shareConfig, setShareConfig] = useState({
    expireIn: "7", // days
    needPassword: true,
    allowDownload: false,
  });
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const currentMemberId = localStorage.getItem("currentMemberId") || "1";
    const archivesData = JSON.parse(localStorage.getItem("archives") || "[]");
    const memberArchives = archivesData.filter(
      (a: Archive) => a.memberId === currentMemberId && !a.isDeleted
    );
    setArchives(memberArchives);
  }, []);

  const toggleArchive = (id: string) => {
    setSelectedArchives((prev) =>
      prev.includes(id) ? prev.filter((aId) => aId !== id) : [...prev, id]
    );
  };

  const handleShare = () => {
    if (selectedArchives.length === 0) return;
    setIsGenerated(true);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetShare = () => {
    setIsGenerated(false);
    setSelectedArchives([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-white px-5 pt-8 pb-6 border-b border-slate-100 sticky top-0 z-20 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">安全分享</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">选择档案并生成安全加密的分享链接</p>
      </div>

      <AnimatePresence mode="wait">
        {!isGenerated ? (
          <Motion.div 
            key="setup"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-5 space-y-6"
          >
            {/* Archive Selection */}
            <div>
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  第一步：选择档案
                </h3>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  已选 {selectedArchives.length} 份
                </span>
              </div>
              
              <div className="bg-white rounded-3xl border border-slate-100 p-2 shadow-sm max-h-[300px] overflow-y-auto custom-scrollbar">
                {archives.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 font-medium text-sm">
                    暂无可分享的档案
                  </div>
                ) : (
                  <div className="space-y-1">
                    {archives.map((archive) => (
                      <button
                        key={archive.id}
                        onClick={() => toggleArchive(archive.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                          selectedArchives.includes(archive.id)
                            ? "bg-blue-50 border border-blue-200"
                            : "hover:bg-slate-50 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedArchives.includes(archive.id) ? "border-blue-600 bg-blue-600" : "border-slate-300"
                          }`}>
                            {selectedArchives.includes(archive.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-slate-800 text-sm">{archive.title}</h4>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                              {new Date(archive.date).toLocaleDateString()} · {archive.hospital}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Share Settings */}
            <div className={`${selectedArchives.length === 0 ? 'opacity-50 pointer-events-none' : ''} transition-opacity`}>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 px-1">
                第二步：权限设置
              </h3>
              
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Validity */}
                <div className="p-4 flex items-center justify-between border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">有效期</h4>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">链接过期后将自动失效</p>
                    </div>
                  </div>
                  <select
                    value={shareConfig.expireIn}
                    onChange={(e) => setShareConfig({ ...shareConfig, expireIn: e.target.value })}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">1天</option>
                    <option value="7">7天</option>
                    <option value="30">30天</option>
                    <option value="forever">永久</option>
                  </select>
                </div>

                {/* Password Protection */}
                <div className="p-4 flex items-center justify-between border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">密码保护</h4>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">访问需输入提取码</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShareConfig({ ...shareConfig, needPassword: !shareConfig.needPassword })}
                    className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out ${shareConfig.needPassword ? 'bg-blue-600' : 'bg-slate-200'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${shareConfig.needPassword ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Download Permission */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">允许下载</h4>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">允许查看者保存原件</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShareConfig({ ...shareConfig, allowDownload: !shareConfig.allowDownload })}
                    className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out ${shareConfig.allowDownload ? 'bg-blue-600' : 'bg-slate-200'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${shareConfig.allowDownload ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              <button
                onClick={handleShare}
                disabled={selectedArchives.length === 0}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all ${
                  selectedArchives.length > 0
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20 active:scale-95"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Share2 className="w-5 h-5" />
                生成分享链接
              </button>
            </div>
          </Motion.div>
        ) : (
          <Motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5"
          >
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 border border-slate-100 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0"></div>
              
              <Motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/30 relative z-10"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </Motion.div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">链接已生成</h3>
              <p className="text-sm text-slate-500 font-medium mb-8">分享内容已加密，请妥善保管提取码</p>
              
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-left border border-slate-100">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200/50">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 truncate flex-1">
                    https://yian.tong/s/8f2k9a
                  </span>
                </div>
                {shareConfig.needPassword && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 font-bold">提取码</span>
                    <span className="text-xl font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                      7821
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 relative z-10">
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                >
                  {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? "已复制" : "复制链接"}
                </button>
                <button
                  className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-200 active:scale-95 transition-all"
                >
                  <QrCode className="w-5 h-5" />
                  保存二维码
                </button>
              </div>
            </div>

            <button
              onClick={resetShare}
              className="mt-8 mx-auto flex items-center gap-2 text-slate-500 hover:text-slate-700 font-medium transition-colors"
            >
              <X className="w-4 h-4" />
              返回继续分享
            </button>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}