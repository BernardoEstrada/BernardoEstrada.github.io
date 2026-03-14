import type { CSSProperties, MouseEvent, TouchEvent } from "react";
import { OsTheme } from "./DesktopWindow";
import type { WindowId } from "./DesktopLayout";

interface WindowFrameProps {
  id: WindowId;
  title: string;
  os: OsTheme;
  onMouseDownWindow: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseDownTitle: (e: MouseEvent<HTMLDivElement>) => void;
  onTouchStartTitle?: (e: TouchEvent<HTMLDivElement>) => void;
  onClose: () => void;
  isFocused: boolean;
  contentArea: React.ReactNode;
  commonStyle: CSSProperties;
  resizeHandles: React.ReactNode | null;
  isMobile?: boolean;
}

export default function WindowFrame({
  id,
  title,
  os,
  onMouseDownWindow,
  onMouseDownTitle,
  onTouchStartTitle,
  onClose,
  isFocused,
  contentArea,
  commonStyle,
  resizeHandles,
  isMobile = false,
}: WindowFrameProps) {
  const titleBarOsClasses =
    os === "win95"
      ? `justify-between text-base-100 ${isFocused ? "bg-primary" : "bg-zinc-500"}`
      : ` flex-row-reverse justify-end bg-base-200 border-b border-base-300 ${
          isFocused ? "bg-primary text-base-100" : "bg-base-200"
        }`;
  return (
    <div
      style={commonStyle}
      className="bg-base-100 border-[3px] border-base-300 shadow-[6px_6px_0_rgba(0,0,0,0.6)]"
      onMouseDown={onMouseDownWindow}
      role="article"
      data-desktop-window-id={id}
      aria-label={title}
      tabIndex={0}
    >
      <div
        className={`flex items-center cursor-move select-none px-2 py-1.5 sm:py-1 transition-none touch-manipulation min-h-[44px] sm:min-h-0 ${titleBarOsClasses}`}
        style={isMobile ? { touchAction: "none" } : undefined}
        onMouseDown={onMouseDownTitle}
        onTouchStart={onTouchStartTitle}
      >
        <span className="text-xs truncate flex-1 min-w-0">{title}</span>
        <div className="flex gap-1 text-[10px] flex-shrink-0">
          {os === "win95" && !isMobile && (
            <>
              <TitleButton os={os} content="_" onClick={() => {}} ariaLabel="Maximize" />
              <TitleButton os={os} content="□" onClick={() => {}} ariaLabel="Minimize" />
            </>
          )}
          <TitleButton os={os} content="×" onClick={onClose} ariaLabel="Close" />
        </div>
      </div>
      <div role="region" aria-label={`Content area for ${title}`} tabIndex={0}>
        {contentArea}
      </div>
      {resizeHandles}
    </div>
  );
}

function TitleButton({
  os,
  content,
  onClick,
  ariaLabel,
}: {
  os: OsTheme;
  content: string;
  onClick: () => void;
  ariaLabel: string;
}) {
  const classes =
    os === "win95"
      ? "px-1 border-base-100 min-w-[28px] min-h-[28px] sm:min-w-0 sm:min-h-0"
      : "w-3 h-3 mr-2 border border-neutral bg-base-100 flex items-center justify-center text-[9px] min-w-[28px] min-h-[28px] sm:min-w-[12px] sm:min-h-[12px] sm:mr-2";
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <button
      type="button"
      className={`border bg-base-100 text-primary touch-manipulation ${classes}`}
      onClick={handleClick}
      aria-label={ariaLabel}
      tabIndex={ariaLabel === "Close" ? undefined : -1}
    >
      {content}
    </button>
  );
}
