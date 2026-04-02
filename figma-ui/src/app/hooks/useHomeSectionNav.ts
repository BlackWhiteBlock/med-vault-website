import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

function isHomePath(pathname: string) {
  return pathname === "/" || pathname === "";
}

/** Hash 路由下不能用 href="#id"，会抢占 hash。改用：在首页则滚动，否则先回首页再通过 location.state 滚动 */
export function useHomeSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHomeSection = useCallback(
    (sectionId: string) => {
      if (isHomePath(location.pathname)) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      navigate("/", { state: { scrollToId: sectionId } });
    },
    [location.pathname, navigate],
  );

  return { goToHomeSection };
}
