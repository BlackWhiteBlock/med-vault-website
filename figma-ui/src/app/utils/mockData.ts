import { Archive } from "../types";

export const MOCK_ARCHIVES: Archive[] = [
  {
    id: "1",
    memberId: "1",
    type: "lab_report",
    title: "血常规检查",
    hospital: "北京协和医院",
    department: "检验科",
    date: "2026-03-10",
    uploadDate: "2026-03-10",
    tags: ["常规检查"],
    isFavorite: true,
    isDeleted: false,
    ocrData: {
      items: [
        { name: "白细胞计数", value: "6.5", unit: "×10^9/L", referenceRange: "3.5-9.5", isAbnormal: false },
        { name: "红细胞计数", value: "4.8", unit: "×10^12/L", referenceRange: "4.3-5.8", isAbnormal: false },
        { name: "血红蛋白", value: "145", unit: "g/L", referenceRange: "130-175", isAbnormal: false },
        { name: "血小板计数", value: "220", unit: "×10^9/L", referenceRange: "125-350", isAbnormal: false },
      ],
    },
  },
  {
    id: "2",
    memberId: "1",
    type: "medical_record",
    title: "内科门诊病历",
    hospital: "北京协和医院",
    department: "内科",
    date: "2026-03-05",
    uploadDate: "2026-03-05",
    tags: ["高血压"],
    isFavorite: false,
    isDeleted: false,
    ocrData: {
      doctorName: "张医生",
      diagnosis: "高血压2级",
    },
  },
  {
    id: "3",
    memberId: "1",
    type: "prescription",
    title: "降压药处方",
    hospital: "北京协和医院",
    department: "内科",
    date: "2026-03-05",
    uploadDate: "2026-03-05",
    tags: ["高血压", "长期用药"],
    isFavorite: true,
    isDeleted: false,
    ocrData: {
      prescription: [
        { name: "苯磺酸氨氯地平片", dosage: "5mg", frequency: "每日1次", duration: "30天" },
        { name: "厄贝沙坦片", dosage: "150mg", frequency: "每日1次", duration: "30天" },
      ],
    },
  },
  {
    id: "4",
    memberId: "1",
    type: "imaging_report",
    title: "胸部CT检查",
    hospital: "北京协和医院",
    department: "放射科",
    date: "2026-02-20",
    uploadDate: "2026-02-20",
    tags: [],
    isFavorite: false,
    isDeleted: false,
    ocrData: {
      diagnosis: "双肺未见明显异常",
    },
  },
  {
    id: "5",
    memberId: "1",
    type: "physical_exam",
    title: "年度体检报告",
    hospital: "爱康国宾体检中心",
    date: "2026-01-15",
    uploadDate: "2026-01-16",
    tags: ["体检"],
    isFavorite: false,
    isDeleted: false,
  },
];

// Initialize localStorage with mock data if empty
export function initializeMockData() {
  const archives = localStorage.getItem("archives");
  if (!archives) {
    localStorage.setItem("archives", JSON.stringify(MOCK_ARCHIVES));
  }
}
