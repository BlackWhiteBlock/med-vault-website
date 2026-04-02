import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronDown, Calendar, Grid3x3, Star, FileText, Upload, Sparkles, TrendingUp, Activity } from "lucide-react";
import { Archive, Member, ARCHIVE_TYPE_LABELS, ARCHIVE_TYPE_COLORS, ArchiveType } from "../types";
import { initializeMockData } from "../utils/mockData";

export default function HomePage() {
  const [viewMode, setViewMode] = useState<"timeline" | "category">("timeline");
  const [archives, setArchives] = useState<Archive[]>([]);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    // Initialize mock data
    initializeMockData();

    // Load data
    loadData();
  }, []);

  const loadData = () => {
    const membersData = JSON.parse(localStorage.getItem("members") || "[]");
    const currentMemberId = localStorage.getItem("currentMemberId") || "1";
    const archivesData = JSON.parse(localStorage.getItem("archives") || "[]");

    setMembers(membersData);
    const member = membersData.find((m: Member) => m.id === currentMemberId);
    setCurrentMember(member || membersData[0]);

    // Filter archives for current member and not deleted
    const filteredArchives = archivesData.filter(
      (a: Archive) => a.memberId === currentMemberId && !a.isDeleted
    );
    setArchives(filteredArchives);
  };

  const groupArchivesByType = () => {
    const grouped: Record<ArchiveType, Archive[]> = {
      medical_record: [],
      lab_report: [],
      imaging_report: [],
      prescription: [],
      physical_exam: [],
      discharge_summary: [],
      invoice: [],
      other: [],
    };

    archives.forEach((archive) => {
      grouped[archive.type].push(archive);
    });

    return Object.entries(grouped).filter(([_, items]) => items.length > 0);
  };

  const groupedArchives = groupArchivesByType();

  return (
    <div className="min-h-screen bg-background">
      {/* Header with gradient */}
      <div className="relative bg-gradient-to-br from-card via-card to-secondary/50 border-b border-primary/20 sticky top-0 z-10 backdrop-blur-xl">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"></div>
        
        <div className="relative px-4 py-4">
          {/* Member Selector */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-md opacity-50"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  医案通
                </h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  AI 智能管理
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all">
              <span className="text-sm font-medium">{currentMember?.name || "本人"}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3 border border-primary/20">
              <div className="text-xs text-muted-foreground mb-1">总档案</div>
              <div className="text-2xl font-bold text-primary">{archives.length}</div>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-3 border border-accent/20">
              <div className="text-xs text-muted-foreground mb-1">本月新增</div>
              <div className="text-2xl font-bold text-accent">
                {archives.filter(a => {
                  const date = new Date(a.uploadDate);
                  const now = new Date();
                  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                }).length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl p-3 border border-success/20">
              <div className="text-xs text-muted-foreground mb-1">收藏</div>
              <div className="text-2xl font-bold text-success">
                {archives.filter(a => a.isFavorite).length}
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="relative flex gap-2 bg-secondary/30 backdrop-blur-sm rounded-2xl p-1 border border-primary/10">
            <button
              onClick={() => setViewMode("timeline")}
              className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${
                viewMode === "timeline"
                  ? "text-white"
                  : "text-muted-foreground"
              }`}
            >
              {viewMode === "timeline" && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl"></div>
              )}
              <Calendar className="relative w-4 h-4" />
              <span className="relative text-sm font-medium">时间轴</span>
            </button>
            <button
              onClick={() => setViewMode("category")}
              className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${
                viewMode === "category"
                  ? "text-white"
                  : "text-muted-foreground"
              }`}
            >
              {viewMode === "category" && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl"></div>
              )}
              <Grid3x3 className="relative w-4 h-4" />
              <span className="relative text-sm font-medium">分类</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {archives.length === 0 ? (
          <EmptyState />
        ) : viewMode === "timeline" ? (
          <TimelineView archives={archives} />
        ) : (
          <CategoryView groupedArchives={groupedArchives} />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
        <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center border border-primary/20">
          <FileText className="w-12 h-12 text-primary" />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">开始您的健康档案</h3>
      <p className="text-muted-foreground mb-6 max-w-xs">
        AI 将帮您智能识别和分析医疗档案
      </p>
      <Link
        to="/upload"
        className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient"></div>
        <Upload className="relative w-5 h-5 text-white" />
        <span className="relative font-medium text-white">上传档案</span>
      </Link>
    </div>
  );
}

function TimelineView({ archives }: { archives: Archive[] }) {
  // Sort by date descending
  const sortedArchives = [...archives].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-3">
      {sortedArchives.map((archive) => (
        <ArchiveCard key={archive.id} archive={archive} />
      ))}
    </div>
  );
}

function CategoryView({ groupedArchives }: { groupedArchives: [string, Archive[]][] }) {
  return (
    <div className="space-y-4">
      {groupedArchives.map(([type, items]) => (
        <div key={type}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground">
              {ARCHIVE_TYPE_LABELS[type as ArchiveType]}
            </h3>
            <span className="text-sm text-muted-foreground">{items.length}份</span>
          </div>
          <div className="space-y-3">
            {items.map((archive) => (
              <ArchiveCard key={archive.id} archive={archive} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ArchiveCard({ archive }: { archive: Archive }) {
  return (
    <Link
      to={`/archive/${archive.id}`}
      className="group relative block rounded-2xl overflow-hidden"
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 rounded-2xl p-4 m-[1px] transition-all">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/20">
                {ARCHIVE_TYPE_LABELS[archive.type]}
              </span>
              {archive.isFavorite && (
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/30 rounded-full blur-md"></div>
                  <Star className="relative w-4 h-4 fill-accent text-accent" />
                </div>
              )}
            </div>
            <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {archive.title}
            </h4>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-primary"></span>
              {archive.hospital} {archive.department && `· ${archive.department}`}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(archive.date).toLocaleDateString("zh-CN")}
          </span>
          {archive.tags.length > 0 && (
            <div className="flex gap-1">
              {archive.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-lg bg-secondary/50 text-muted-foreground border border-border">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}