import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import Root from "./Root";
import { AppIconSvg } from "./pages/LogoPage";
import { Dashboard } from "./pages/Dashboard";
import { Records } from "./pages/Records";
import { OCR } from "./pages/OCR";
import { Family } from "./pages/Family";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";
import ArchiveDetailPage from "./pages/ArchiveDetailPage";
import SearchPage from "./pages/SearchPage";
import UploadPage from "./pages/UploadPage";
import SharePage from "./pages/SharePage";
import MembersPage from "./pages/MembersPage";
import MetricHistoryPage from "./pages/MetricHistoryPage";
import DocumentViewerPage from "./pages/DocumentViewerPage";
import PromoPage from "./pages/PromoPage";
import LogoPage from "./pages/LogoPage";
import AppDownloadPage from "./pages/AppDownloadPage";

import { Home } from "./pages/Home";

/** Hash 路由：无需服务端 fallback；ESA Pages 已配置 SPA fallback，后续也可改 BrowserRouter */
export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    Component: Root,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "search",
        Component: SearchPage,
      },
      {
        path: "upload",
        Component: UploadPage,
      },
      {
        path: "share",
        Component: SharePage,
      },
      {
        path: "settings",
        Component: Settings,
      },
      {
        path: "records",
        Component: Records,
      },
      {
        path: "ocr",
        Component: OCR,
      },
      {
        path: "family",
        Component: Family,
      },
      {
        path: "members",
        Component: MembersPage,
      },
    ],
  },
  {
    path: "/records/:id",
    Component: ArchiveDetailPage,
  },
  {
    path: "/records/history/:categoryId",
    Component: MetricHistoryPage,
  },
  {
    path: "/records/history/:categoryId/originals",
    Component: DocumentViewerPage,
  },
  {
    path: "/promo",
    Component: PromoPage,
  },
  {
    path: "/logo",
    Component: LogoPage,
  },
  {
    // App 下载落地页：暂无站内入口，直接通过 URL（/#/download）访问
    path: "/download",
    Component: AppDownloadPage,
  },
  {
    path: "/login",
    Component: Login,
  },
]);