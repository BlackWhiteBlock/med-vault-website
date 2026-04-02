import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Hero } from "./Home/Hero";
import { Why } from "./Home/Why";
import { Solution } from "./Home/Solution";
import { Features } from "./Home/Features";
import { Scenarios } from "./Home/Scenarios";
import { Principles } from "./Home/Principles";
import { Privacy } from "./Home/Privacy";
import { CTA } from "./Home/CTA";
import { TargetAudience } from "./Home/TargetAudience";

export function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const id = (location.state as { scrollToId?: string } | undefined)?.scrollToId;
    if (!id) return;

    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      navigate("/", { replace: true, state: {} });
    }, 80);

    return () => clearTimeout(t);
  }, [location.state, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 overflow-hidden">
      <Hero />
      <Why />
      <Solution />
      <Features />
      <Scenarios />
      <Principles />
      <Privacy />
      <TargetAudience />
      <CTA />
    </div>
  );
}
