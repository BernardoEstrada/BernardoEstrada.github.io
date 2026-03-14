import { useMemo } from "react";
import type { CSSProperties, MouseEvent, TouchEvent, ReactNode } from "react";
import WindowFrame from "./WindowFrame";
import type { WindowId } from "./DesktopLayout";

export type OsTheme = "macclassic" | "win95";

export type ResizeSide = "left" | "right" | "top" | "bottom";

export const MIN_WIDTH = 260;
export const MIN_HEIGHT = 160;

export interface DesktopFrameProps {
  id: WindowId;
  os: OsTheme;
  title: string;
  children: ReactNode;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  isFocused: boolean;
  isMobile?: boolean;
  debugResizeHandlesEnabled?: boolean;
  onMouseDownTitle: (e: MouseEvent<HTMLDivElement>) => void;
  onTouchStartTitle?: (e: TouchEvent<HTMLDivElement>) => void;
  onMouseDownWindow: (e: MouseEvent<HTMLDivElement>) => void;
  onClose: () => void;
  onResizeStart: (sides: [ResizeSide, ResizeSide?], e: MouseEvent<HTMLDivElement>) => void;
}

const getClassesForResizeHandle = (win: Pick<DesktopFrameProps, "width" | "height">, debug = false) => {
  const base = debug ? "absolute z-10 border-red-500 border-2" : "absolute z-10";
  const atMinW = win.width <= MIN_WIDTH;
  const atMinH = win.height <= MIN_HEIGHT;
  const corner = `${base} -bottom-4 w-6 h-6`;
  const horizontal = `${base} top-0 h-full w-3`;
  const vertical = `${base} left-0 h-3 w-full`;

  return {
    bottom: `${vertical} -bottom-2 ${atMinH ? "cursor-s-resize" : "cursor-ns-resize"}`,
    left: `${horizontal} -left-2 ${atMinW ? "cursor-w-resize" : "cursor-ew-resize"}`,
    right: `${horizontal} -right-2 ${atMinW ? "cursor-e-resize" : "cursor-ew-resize"}`,
    bottomLeft: `${corner} -left-4 ${atMinW && atMinH ? "cursor-sw-resize" : "cursor-nesw-resize"}`,
    bottomRight: `${corner} -right-4 ${atMinW && atMinH ? "cursor-se-resize" : "cursor-nwse-resize"}`,
  };
};

export default function DesktopWindowFrame({
  id,
  os,
  title,
  children,
  x,
  y,
  z,
  width,
  height,
  isFocused,
  isMobile = false,
  onMouseDownTitle,
  onTouchStartTitle,
  onMouseDownWindow,
  onClose,
  onResizeStart,
  debugResizeHandlesEnabled = false,
}: DesktopFrameProps) {
  const commonStyle: CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    zIndex: z,
    width: isMobile ? "calc(100vw - 24px)" : width,
    maxWidth: isMobile ? "calc(100vw - 24px)" : "90vw",
  };

  const resizeHandleClasses = useMemo(
    () => getClassesForResizeHandle({ width, height }, debugResizeHandlesEnabled),
    [width, height, debugResizeHandlesEnabled],
  );

  const resizeHandles = isMobile ? null : (
    <>
      <div className={resizeHandleClasses.left} onMouseDown={(e) => onResizeStart(["left"], e)} />
      <div className={resizeHandleClasses.right} onMouseDown={(e) => onResizeStart(["right"], e)} />
      <div className={resizeHandleClasses.bottom} onMouseDown={(e) => onResizeStart(["bottom"], e)} />
      <div className={resizeHandleClasses.bottomRight} onMouseDown={(e) => onResizeStart(["bottom", "right"], e)} />
      <div className={resizeHandleClasses.bottomLeft} onMouseDown={(e) => onResizeStart(["bottom", "left"], e)} />
    </>
  );

  const contentArea = (
    <div
      className="bg-base-100 border-t border-base-300 relative overflow-auto"
      style={{ height: isMobile ? "min(60vh, 400px)" : height }}
    >
      {children}
    </div>
  );

  return (
    <WindowFrame
      id={id}
      title={title}
      os={os}
      onMouseDownWindow={onMouseDownWindow}
      onMouseDownTitle={onMouseDownTitle}
      onTouchStartTitle={onTouchStartTitle}
      onClose={onClose}
      isFocused={isFocused}
      contentArea={contentArea}
      commonStyle={commonStyle}
      resizeHandles={resizeHandles}
      isMobile={isMobile}
    />
  );
}
