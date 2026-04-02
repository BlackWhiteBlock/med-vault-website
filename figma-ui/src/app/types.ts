export interface Member {
  id: string;
  name: string;
  relation: string;
  gender?: string;
  birthday?: string;
  bloodType?: string;
  allergies?: string;
}

export interface Archive {
  id: string;
  memberId: string;
  type: ArchiveType;
  title: string;
  hospital: string;
  department?: string;
  date: string;
  uploadDate: string;
  imageUrl?: string;
  ocrData?: OCRData;
  tags: string[];
  isFavorite: boolean;
  isDeleted: boolean;
}

export type ArchiveType =
  | "medical_record"    // 门诊病历
  | "lab_report"        // 检验报告
  | "imaging_report"    // 影像报告
  | "prescription"      // 处方
  | "physical_exam"     // 体检报告
  | "discharge_summary" // 出院记录
  | "invoice"           // 发票
  | "other";            // 其他

export interface OCRData {
  hospital?: string;
  department?: string;
  date?: string;
  doctorName?: string;
  diagnosis?: string;
  items?: LabItem[];
  prescription?: PrescriptionItem[];
  [key: string]: any;
}

export interface LabItem {
  name: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  isAbnormal?: boolean;
}

export interface PrescriptionItem {
  name: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
}

export interface ShareLink {
  id: string;
  archiveIds: string[];
  url: string;
  password?: string;
  expiresAt: string;
  createdAt: string;
  isRevoked: boolean;
  viewCount: number;
}

export const ARCHIVE_TYPE_LABELS: Record<ArchiveType, string> = {
  medical_record: "门诊病历",
  lab_report: "检验报告",
  imaging_report: "影像报告",
  prescription: "处方",
  physical_exam: "体检报告",
  discharge_summary: "出院记录",
  invoice: "发票",
  other: "其他",
};

export const ARCHIVE_TYPE_COLORS: Record<ArchiveType, string> = {
  medical_record: "bg-blue-100 text-blue-700",
  lab_report: "bg-green-100 text-green-700",
  imaging_report: "bg-purple-100 text-purple-700",
  prescription: "bg-orange-100 text-orange-700",
  physical_exam: "bg-cyan-100 text-cyan-700",
  discharge_summary: "bg-pink-100 text-pink-700",
  invoice: "bg-gray-100 text-gray-700",
  other: "bg-slate-100 text-slate-700",
};
