import { useState, useCallback, useEffect } from "react";
import type { MouseEvent, TouchEvent, CSSProperties } from "react";
import { resume, getEnrichedSkills } from "@portfolios/data/resume";
import DesktopWindowFrame, { MIN_HEIGHT, MIN_WIDTH, OsTheme, ResizeSide } from "./DesktopWindow";
import { Profile, Skills, Experience, Contact } from "./windowContent";
import { useIsMobile } from "@hooks";
import headshot from "@assets/headshot.jpg";
import profileIcon from "@assets/icons/os/win/profile.png";
import React from "react";

export type WindowId = "profile" | "skills" | "experience" | "contact" | "headshot";

const MOBILE_BREAKPOINT = 768;
const TITLE_BAR_HEIGHT = 44;

const OS_DESKTOP_COLORS: Record<OsTheme, { bg: string; color: string }> = {
  win95: { bg: "#008080", color: "#c0c0c0" },
  macclassic: { bg: "#7f7f7f", color: "#d9d9d9" },
};

/**
 * Clamp window position so it stays within the viewport.
 * Uses only the window frame (title bar + content area); resize handles are ignored
 * so they may extend past the viewport and get clipped when the window is at the edge.
 */
function clampWindowPosition(x: number, y: number, width: number, height: number, isMobile: boolean): [number, number] {
  if (typeof window === "undefined") return [x, y];
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const effectiveVh = isMobile && window.visualViewport ? Math.min(vh, window.visualViewport.height) : vh;
  const frameWidth = isMobile ? vw - 24 : width;
  const frameHeight = height + TITLE_BAR_HEIGHT - 12;
  const clampedX = Math.max(0, Math.min(x, vw - frameWidth));
  const clampedY = Math.max(0, Math.min(y, effectiveVh - frameHeight));
  return [clampedX, clampedY];
}

function getMobileWindowDimensions() {
  if (typeof window === "undefined") return { width: 340, height: 280, x: 12, y: 12 };
  const padding = 12;
  const width = Math.min(420, window.innerWidth - padding * 2);
  const height = Math.min(320, Math.max(220, window.innerHeight * 0.45));
  return { width, height, x: padding, y: padding };
}

type DesktopIconIcon = Partial<Record<OsTheme, React.ComponentType | React.ReactElement | string>>;

const DESKTOP_ICONS: { id: WindowId | "theme"; label: string; icon?: DesktopIconIcon }[] = [
  { id: "profile", label: "Profile", icon: { win95: profileIcon } },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
  { id: "headshot", label: "Headshot" },
  { id: "theme", label: "Theme" },
];

interface DesktopWindow {
  id: WindowId;
  title: string;
  x: number;
  y: number;
  z: number;
  isOpen: boolean;
  width: number;
  height: number;
  component: React.ReactElement;
}

function createInitialWindows(groupedSkills: Record<string, ReturnType<typeof getEnrichedSkills>>): DesktopWindow[] {
  const defaultOpenWindows: WindowId[] = ["profile", "skills", "experience", "contact"];
  const isMobile = typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;

  const baseWindow: Pick<DesktopWindow, "isOpen"> = { isOpen: false };
  const baseWindows: Pick<DesktopWindow, "id" | "title" | "component" | "isOpen">[] = [
    { id: "profile", title: "Bernardo - Profile", component: <Profile resume={resume} />, ...baseWindow },
    {
      id: "skills",
      title: "Skills - Map",
      component: <Skills resume={resume} groupedSkills={groupedSkills} />,
      ...baseWindow,
    },
    {
      id: "experience",
      title: "Experience - Timeline",
      component: <Experience resume={resume} />,
      ...baseWindow,
    },
    { id: "contact", title: "Contact - Links", component: <Contact resume={resume} />, ...baseWindow },
    {
      id: "headshot",
      title: "Headshot",
      component: <img src={headshot} alt="Headshot" className="max-w-full max-h-full object-contain" />,
      ...baseWindow,
    },
  ];

  if (isMobile) {
    const { width, height, x, y } = getMobileWindowDimensions();
    const maxOffset = (window.innerHeight - height - 220) / baseWindows.length;
    const customHeights: Partial<Record<WindowId, number>> = {
      profile: 50,
      contact: 50,
    };
    const windows = baseWindows.map((w, index) => {
      const isOpen = defaultOpenWindows.includes(w.id);
      const z = isOpen && defaultOpenWindows[0] === w.id ? 2 : index + 1;
      const wY = y + 220 + maxOffset * index;
      const wX = x;
      return { ...w, x: wX, y: wY, width, height: customHeights[w.id] ?? height, z, isOpen };
    });
    console.log(windows);
    return windows;
  }
  return [
    {
      id: "profile",
      title: "Bernardo - Profile",
      x: 80,
      y: 80,
      z: 1,
      isOpen: true,
      width: 420,
      height: 260,
      component: <Profile resume={resume} />,
    },
    {
      id: "skills",
      title: "Skills - Map",
      x: 260,
      y: 120,
      z: 2,
      isOpen: true,
      width: 460,
      height: 320,
      component: <Skills resume={resume} groupedSkills={groupedSkills} />,
    },
    {
      id: "experience",
      title: "Experience - Timeline",
      x: 140,
      y: 240,
      z: 0,
      isOpen: false,
      width: 480,
      height: 280,
      component: <Experience resume={resume} />,
    },
    {
      id: "contact",
      title: "Contact - Links",
      x: 260,
      y: 260,
      z: 0,
      isOpen: false,
      width: 360,
      height: 200,
      component: <Contact resume={resume} />,
    },
    {
      id: "headshot",
      title: "Headshot",
      x: 260,
      y: 260,
      z: 0,
      isOpen: false,
      width: 360,
      height: 200,
      component: <img src={headshot} alt="Headshot" />,
    },
  ];
}

interface DesktopLayoutProps {
  initialOsTheme?: OsTheme;
  onOsChange?: (os: OsTheme) => void;
}

export default function DesktopLayout({ initialOsTheme = "macclassic", onOsChange }: DesktopLayoutProps) {
  const [os, setOs] = useState<OsTheme>(initialOsTheme);
  const isMobile = useIsMobile();

  const skills = getEnrichedSkills();
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      const key = skill.domain;
      if (!acc[key]) acc[key] = [];
      acc[key].push(skill);
      return acc;
    },
    {} as Record<string, ReturnType<typeof getEnrichedSkills>>,
  );

  const [windows, setWindows] = useState<DesktopWindow[]>(() => createInitialWindows(groupedSkills));
  const [dragging, setDragging] = useState<{
    id: WindowId;
    offsetX: number;
    offsetY: number;
    touchId?: number;
  } | null>(null);
  const [resizing, setResizing] = useState<{
    sides: [ResizeSide, ResizeSide?];
    id: WindowId;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  const [maxWindowZ, setMaxWindowZ] = useState(windows.reduce((max, w) => (w.z > max ? w.z : max), 0));

  const bringToFront = (id: WindowId) => {
    setWindows((prev) => {
      const maxZ = prev.reduce((max, w) => (w.z > max ? w.z : max), 0);
      setMaxWindowZ(maxZ + 1);
      return prev.map((w) => (w.id === id ? { ...w, z: maxZ + 1 } : w));
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (resizing) {
      const { sides, id, startX, startY, startWidth, startHeight } = resizing;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      setWindows((prev) =>
        prev.map((w) => {
          if (w.id !== id) return w;
          const updates: Partial<DesktopWindow> = {};
          if (sides.includes("bottom")) updates.height = Math.max(MIN_HEIGHT, startHeight + deltaY);
          if (sides.includes("right")) updates.width = Math.max(MIN_WIDTH, startWidth + deltaX);
          if (sides.includes("left") && startWidth - deltaX >= MIN_WIDTH) {
            updates.width = startWidth - deltaX;
            updates.x = e.clientX;
          }
          if (sides.includes("top") && startHeight - deltaY >= MIN_HEIGHT) {
            updates.height = startHeight - deltaY;
            updates.y = e.clientY;
          }
          return { ...w, ...updates };
        }),
      );
      return;
    }
    if (dragging) {
      const { id, offsetX, offsetY } = dragging;
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;
      const win = windows.find((w) => w.id === id);
      if (win) {
        [x, y] = clampWindowPosition(x, y, win.width, win.height, isMobile);
      }
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
  };

  const getTouchClient = useCallback((e: TouchEvent, touchId?: number) => {
    const list = e.touches.length ? e.touches : e.changedTouches;
    const t = touchId != null ? Array.from(list).find((t) => t.identifier === touchId) : list[0];
    return t;
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (!dragging || dragging.touchId === undefined) return;
      const t = getTouchClient(e, dragging.touchId);
      if (!t) return;
      let x = t.clientX - dragging.offsetX;
      let y = t.clientY - dragging.offsetY;
      setWindows((prev) => {
        const win = prev.find((w) => w.id === dragging.id);
        if (win) {
          [x, y] = clampWindowPosition(x, y, win.width, win.height, isMobile);
        }
        return prev.map((w) => (w.id === dragging.id ? { ...w, x, y } : w));
      });
    },
    [dragging, getTouchClient, isMobile],
  );

  const handleTouchEnd = useCallback(() => {
    setDragging(null);
    setResizing(null);
  }, []);

  // Prevent page scroll while dragging a window on touch devices (non-passive listener required)
  useEffect(() => {
    const touchId = dragging?.touchId;
    if (touchId === undefined) return;
    const onTouchMove = (e: globalThis.TouchEvent) => {
      const isOurDragTouch = Array.from(e.touches).some((t) => t.identifier === touchId);
      if (isOurDragTouch) e.preventDefault();
    };
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => document.removeEventListener("touchmove", onTouchMove);
  }, [dragging?.touchId]);

  // Sync :root/body background with desktop color so iOS Safari top/bottom bars match the theme
  useEffect(() => {
    const { bg, color } = OS_DESKTOP_COLORS[os];
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlBg = html.style.backgroundColor;
    const prevHtmlColor = html.style.color;
    const prevBodyBg = body.style.backgroundColor;
    const prevBodyColor = body.style.color;
    html.style.backgroundColor = bg;
    html.style.color = color;
    body.style.backgroundColor = bg;
    body.style.color = color;
    return () => {
      html.style.backgroundColor = prevHtmlBg;
      html.style.color = prevHtmlColor;
      body.style.backgroundColor = prevBodyBg;
      body.style.color = prevBodyColor;
    };
  }, [os]);

  const flashIcon = async (id: WindowId | "theme", callback?: () => void) => {
    const timeout = 100;
    const el = document.querySelector<HTMLButtonElement>(`[data-desktop-icon-id="${id}"]`);

    if (el) {
      for (let i = 0; i < 2; i++) {
        el.blur();
        await new Promise((resolve) => setTimeout(resolve, timeout));
        el.focus();
        await new Promise((resolve) => setTimeout(resolve, timeout));
      }
      el.blur();
    }
    callback?.();
  };

  const openWindow = (id: WindowId | "theme") => {
    flashIcon(id, () => {
      if (id === "theme") {
        handleOsChange(os === "macclassic" ? "win95" : "macclassic");
        return;
      }
      bringToFront(id);
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: true } : w)));
      setTimeout(() => {
        const window = document.querySelector<HTMLDivElement>(`[data-desktop-window-id="${id}"]`);
        window?.focus();
      }, 100);
    });
  };

  const closeWindow = (id: WindowId) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
  };

  const desktopBg = os === "win95" ? "bg-[#008080]" : "bg-[#7f7f7f]";

  const ditherPatternStyle: CSSProperties = {
    backgroundImage:
      "linear-gradient(45deg, rgba(0,0,128,0.9) 25%, transparent 25%, transparent 75%, rgba(0,0,128,0.9) 75%), linear-gradient(45deg, rgba(0,0,128,0.9) 25%, transparent 25%, transparent 75%, rgba(0,0,128,0.9) 75%)",
    backgroundPosition: "0 0, 1px 1px",
    backgroundSize: "2px 2px",
    mixBlendMode: "hard-light",
    opacity: 0.9,
  };

  const iconButtonClasses = () => {
    const base =
      "flex flex-col items-center gap-1 max-w-min focus:outline-none px-1 py-0.5 border border-transparent transition-none cursor-pointer";

    return os == "win95" ? `${base}` : `${base} focus:rounded-md focus:bg-[#000080]/60`;
  };

  const iconLabelClasses = () => {
    const base = "px-1 line-clamp-2 transition-none";

    return os === "win95"
      ? `${base} border border-1 bg-black/50 text-base-100 border-transparent group-focus:bg-primary group-focus:border-base-100 group-focus:border-dotted`
      : `${base} bg-black/50 text-base-100 border-black group-focus:bg-base-100 group-focus:text-black`;
  };

  const handleOsChange = (next: OsTheme) => {
    setOs(next);
    onOsChange?.(next);
  };

  return (
    <div
      data-theme={os}
      className={`min-h-screen ${desktopBg} relative ${resizing ? "select-none" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      aria-label="Desktop icons"
    >
      <div
        className="absolute left-2 top-2 sm:left-4 sm:top-4 space-y-2 sm:space-y-4 text-[10px] sm:text-[11px] text-base-100 max-w-[50vw] sm:max-w-none"
        role="navigation"
      >
        <div className="grid grid-cols-3 md:grid-cols-2 gap-1.5 sm:gap-2 justify-items-center">
          {DESKTOP_ICONS.map((icon) => {
            const iconDef = icon.icon?.[os];

            let iconElement: React.ReactNode = null;
            let maskStyle: CSSProperties | undefined;
            if (typeof iconDef === "string") {
              iconElement = <img src={iconDef} alt={icon.label} className="max-w-full max-h-full" />;
              maskStyle = {
                WebkitMaskImage: `url(${iconDef})`,
                maskImage: `url(${iconDef})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "cover",
                maskSize: "cover",
              };
            } else if (iconDef && React.isValidElement(iconDef)) {
              iconElement = iconDef;
            } else if (typeof iconDef === "function") {
              const IconComponent = iconDef as React.ComponentType;
              iconElement = <IconComponent />;
            } else {
              iconElement = (
                <div
                  className={`w-full h-full border border-base-300 bg-base-100 flex items-center justify-center ${
                    os === "macclassic" ? "group-focus:shadow-[0_0_0_1px_#FFFFFF]" : ""
                  }`}
                />
              );
            }

            return (
              <button
                key={icon.id}
                type="button"
                aria-label={icon.label}
                data-desktop-icon-id={icon.id}
                onClick={() => isMobile && openWindow(icon.id)}
                onDoubleClick={() => !isMobile && openWindow(icon.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    openWindow(icon.id);
                  }
                }}
                className={`${iconButtonClasses()} min-h-[44px] sm:min-h-0 touch-manipulation group`}
              >
                <div className="relative w-20 h-20 md:w-10 md:h-10 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {iconElement}
                  {os === "win95" ? (
                    <div
                      className="absolute inset-0 w-full h-full pointer-events-none hidden group-focus:block"
                      style={maskStyle ? { ...ditherPatternStyle, ...maskStyle } : ditherPatternStyle}
                    />
                  ) : null}
                </div>
                <span className={iconLabelClasses()}>{icon.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Windows */}
      <div role="main" aria-label="Desktop windows">
        {windows
          .filter((w) => w.isOpen)
          .map((w) => {
            const handleMouseDownTitle = (e: MouseEvent<HTMLDivElement>) => {
              const rect = (e.currentTarget.parentElement as HTMLDivElement).getBoundingClientRect();
              setDragging({
                id: w.id,
                offsetX: e.clientX - rect.left,
                offsetY: e.clientY - rect.top,
              });
              bringToFront(w.id);
            };
            const handleTouchStartTitle = (e: TouchEvent<HTMLDivElement>) => {
              const t = e.touches[0];
              if (!t) return;
              const rect = (e.currentTarget.parentElement as HTMLDivElement).getBoundingClientRect();
              setDragging({
                id: w.id,
                offsetX: t.clientX - rect.left,
                offsetY: t.clientY - rect.top,
                touchId: t.identifier,
              });
              bringToFront(w.id);
            };
            const handleMouseDownWindow = () => bringToFront(w.id);

            return (
              <DesktopWindowFrame
                key={w.id}
                id={w.id}
                os={os}
                title={w.title}
                x={w.x}
                y={w.y}
                z={w.z}
                width={w.width}
                height={w.height}
                isFocused={w.z === maxWindowZ}
                isMobile={isMobile}
                onMouseDownTitle={handleMouseDownTitle}
                onTouchStartTitle={handleTouchStartTitle}
                onMouseDownWindow={handleMouseDownWindow}
                onResizeStart={(sides: [ResizeSide, ResizeSide?], e: MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  setResizing({
                    sides,
                    id: w.id,
                    startX: e.clientX,
                    startY: e.clientY,
                    startWidth: w.width,
                    startHeight: w.height,
                  });
                  bringToFront(w.id);
                }}
                onClose={() => closeWindow(w.id)}
              >
                {w.component}
              </DesktopWindowFrame>
            );
          })}
      </div>
    </div>
  );
}
