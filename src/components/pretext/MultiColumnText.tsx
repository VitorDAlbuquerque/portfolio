"use client";

import { useRef } from "react";

import { useElementWidth } from "@/hooks/useResponsiveText";
import { useTextMeasurement } from "@/hooks/useTextMeasurement";
import { PRETEXT_SERIF } from "@/lib/font-stacks";

type MultiColumnTextProps = {
  children: string;
  className?: string;
  columns?: number;
  gapRem?: number;
  fontFamily?: string;
  fontSizePx?: number;
  lineHeightPx?: number;
  fontWeight?: number | string;
};

export function MultiColumnText({
  children,
  className = "",
  columns = 2,
  gapRem = 1.25,
  fontFamily = PRETEXT_SERIF,
  fontSizePx = 17,
  lineHeightPx = 28,
  fontWeight = 400,
}: MultiColumnTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);
  const inner = Math.max(0, width - 1);
  const gapPx = gapRem * 16;
  const colWidth =
    inner > 0 ? Math.max(120, (inner - gapPx * (columns - 1)) / columns) : 0;

  const { height } = useTextMeasurement({
    text: children,
    maxWidth: colWidth,
    fontSizePx,
    lineHeightPx,
    fontFamily,
    fontWeight,
  });

  return (
    <div ref={ref} className={className}>
      <blockquote
        className="text-frieren-text-md border-l-2 border-frieren-green-md pl-4"
        style={{
          columnCount: columns,
          columnGap: `${gapRem}rem`,
          columnFill: "balance",
          fontSize: `${fontSizePx}px`,
          lineHeight: `${lineHeightPx}px`,
          fontFamily,
          fontWeight,
          minHeight: inner > 0 && colWidth > 0 ? `${height}px` : undefined,
          textAlign: "justify",
          hyphens: "auto",
        }}
      >
        {children}
      </blockquote>
    </div>
  );
}
