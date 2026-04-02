import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Search, Calendar, MapPin, Tag, X, Star, Filter, Activity, ActivityIcon, FolderHeart } from "lucide-react";
import { motion as Motion } from "motion/react";
import { Archive, ARCHIVE_TYPE_LABELS, ARCHIVE_TYPE_COLORS } from "../types";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [archives, setArchives] = useState<Archive[]>([]);
  const [filteredArchives, setFilteredArchives] = useState<Archive[]>([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const currentMemberId = localStorage.getItem("currentMemberId") || "1";
    const archivesData = JSON.parse(localStorage.getItem("archives") || "[]");
    const filtered = archivesData.filter(
      (a: Archive) => a.memberId === currentMemberId && !a.isDeleted
    );
    setArchives(filtered);
    setFilteredArchives(filtered);
  }, []);

  useEffect(() => {
    filterArchives();
  }, [keyword, selectedHospital, selectedDateRange]);

  const filterArchives = () => {
    let filtered = [...archives];

    if (keyword) {
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(keyword.toLowerCase()) ||
          a.hospital.toLowerCase().includes(keyword.toLowerCase()) ||
          (a.department && a.department.toLowerCase().includes(keyword.toLowerCase())) ||
          a.tags.some((tag) => tag.toLowerCase().includes(keyword.toLowerCase()))
      );
    }

    if (selectedHospital) {
      filtered = filtered.filter((a) => a.hospital === selectedHospital);
    }

    if (selectedDateRange) {
      const now = new Date();
      let startDate = new Date();

      switch (selectedDateRange) {
        case "week":
          startDate.setDate(now.getDate() - 7);
          break;
        case "month":
          startDate.setMonth(now.getMonth() - 1);
          break;
        case "quarter":
          startDate.setMonth(now.getMonth() - 3);
          break;
        case "year":
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter((a) => new Date(a.date) >= startDate);
    }

    setFilteredArchives(filtered);
  };

  const hospitals = [...new Set(archives.map((a) => a.hospital))];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Search Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-5 py-4 z-20 shadow-sm">
        <h2 className="font-bold text-lg text-slate-900 mb-4 tracking-tight">智能搜索</h2>

        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索症状、科室、药品或标签..."
              className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400 placeholder:font-normal"
            />
            {keyword && (
              <button
                onClick={() => setKeyword("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <div className="bg-slate-200 hover:bg-slate-300 rounded-full p-1 transition-colors">
                  <X className="w-3.5 h-3.5 text-slate-600" />
                </div>
              </button>
            )}
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-center ${
              isFilterOpen || selectedHospital || selectedDateRange 
                ? 'bg-blue-50 border-blue-200 text-blue-600' 
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Dropdown */}
        <Motion.div 
          initial={false}
          animate={{ height: isFilterOpen ? 'auto' : 0, opacity: isFilterOpen ? 1 : 0, marginTop: isFilterOpen ? 16 : 0 }}
          className="overflow-hidden"
        >
          <div className="space-y-4 pt-2 pb-2">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                <MapPin className="w-3.5 h-3.5" /> 就诊机构
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedHospital("")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedHospital === ""
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
                  }`}
                >
                  全部机构
                </button>
                {hospitals.map((hospital) => (
                  <button
                    key={hospital}
                    onClick={() => setSelectedHospital(hospital)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedHospital === hospital
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
                    }`}
                  >
                    {hospital}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                <Calendar className="w-3.5 h-3.5" /> 时间范围
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "", label: "全部时间" },
                  { value: "week", label: "近一周" },
                  { value: "month", label: "近一月" },
                  { value: "quarter", label: "近三月" },
                  { value: "year", label: "近一年" },
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedDateRange(range.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedDateRange === range.value
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Motion.div>
      </div>

      {/* Results */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-500">
            为您找到 <span className="text-blue-600 font-bold">{filteredArchives.length}</span> 份相关档案
          </span>
          {(keyword || selectedHospital || selectedDateRange) && (
            <button
              onClick={() => {
                setKeyword("");
                setSelectedHospital("");
                setSelectedDateRange("");
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-full transition-colors"
            >
              重置条件
            </button>
          )}
        </div>

        {filteredArchives.length === 0 ? (
          <Motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-100 blur-2xl rounded-full opacity-50"></div>
              <div className="w-20 h-20 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center justify-center relative z-10">
                <Search className="w-8 h-8 text-blue-300" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">未找到匹配档案</h3>
            <p className="text-sm text-slate-500 max-w-[200px]">尝试更换关键词，或者放宽筛选条件进行搜索</p>
          </Motion.div>
        ) : (
          <div className="space-y-4">
            {filteredArchives.map((archive, index) => (
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={archive.id}
              >
                <Link
                  to={`/archive/${archive.id}`}
                  className="block bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group relative overflow-hidden"
                >
                  {archive.ocrData && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-50/50 to-transparent -z-0"></div>
                  )}
                  
                  <div className="flex items-start justify-between mb-3 relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                          {ARCHIVE_TYPE_LABELS[archive.type] || "其他"}
                        </span>
                        {archive.ocrData && (
                          <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-bold">
                            <ActivityIcon size={10} /> AI已解析
                          </span>
                        )}
                        {archive.isFavorite && (
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        )}
                      </div>
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-1.5">
                        {archive.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                        <FolderHeart className="w-3.5 h-3.5" />
                        {archive.hospital} {archive.department && `· ${archive.department}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                    <span className="text-xs font-medium text-slate-400">
                      {new Date(archive.date).toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </span>
                    {archive.tags && archive.tags.length > 0 && (
                      <div className="flex gap-1.5">
                        {archive.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 rounded-lg bg-slate-50 text-slate-500 text-[10px] font-medium border border-slate-100 flex items-center gap-1">
                            <Tag className="w-3 h-3 text-slate-400" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </Motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}