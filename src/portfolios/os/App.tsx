import { useEffect } from "react";
import { useStaticViewport } from "@hooks";
import DesktopLayout from "./DesktopLayout";
import { useNavigate, useParams } from "react-router-dom";
import type { OsTheme } from "./DesktopWindow";

type OsParam = OsTheme | undefined;
const DEFAULT_OS = "win95";

export default function OsPortfolio() {
  useStaticViewport();
  const { os } = useParams<{ os?: OsParam }>();
  const navigate = useNavigate();

  // Rewrite bare /portfolio/os to /portfolio/os/default
  useEffect(() => {
    if (!os) {
      navigate(`/portfolio/os/${DEFAULT_OS}`, { replace: true });
    }
  }, [os, navigate]);

  // Treat "default" (or any unknown value) as the default theme
  const initialOs: OsTheme = os === "macclassic" ? "macclassic" : DEFAULT_OS;

  const handleOsChange = (next: OsTheme) => {
    navigate(`/portfolio/os/${next}`, { replace: true });
  };

  return <DesktopLayout initialOsTheme={initialOs} onOsChange={handleOsChange} />;
}
