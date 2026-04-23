"use client";

import { useMemo, useRef } from "react";

import { useElementWidth } from "@/hooks/useResponsiveText";
import { truncateToMaxLines } from "@/lib/pretext/truncateToLines";
import { PRETEXT_SERIF } from "@/lib/font-stacks";

type TruncatedTextProps = {
  children: string;
  lines: number;
  className?: string;
  fontFamily?: string;
  fontSizePx?: number;
  lineHeightPx?: number;
  fontWeight?: number | string;
};

export function TruncatedText({
  children,
  lines,
  className = "",
  fontFamily = PRETEXT_SERIF,
  fontSizePx = 15,
  lineHeightPx = 24,
  fontWeight = 400,
}: TruncatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const width = useElementWidth(ref);
  const measured = Math.max(0, width - 1);

  const text = useMemo(() => {
    if (measured <= 0) return children;
    return truncateToMaxLines(
      children,
      measured,
      lines,
      fontFamily,
      fontSizePx,
      lineHeightPx,
      fontWeight
    );
  }, [children, measured, lines, fontFamily, fontSizePx, lineHeightPx, fontWeight]);

  return (
    <p
      ref={ref}
      className={className}
      style={{
        fontSize: `${fontSizePx}px`,
        lineHeight: `${lineHeightPx}px`,
        fontWeight,
        fontFamily,
        ...(measured <= 0
          ? {
              display: "-webkit-box",
              WebkitBoxOrient: "vertical" as const,
              WebkitLineClamp: lines,
              overflow: "hidden",
            }
          : {}),
      }}
    >
      {text}
    </p>
  );
}
