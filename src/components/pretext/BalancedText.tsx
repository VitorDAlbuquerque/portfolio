"use client";

import { useRef } from "react";

import { useElementWidth } from "@/hooks/useResponsiveText";
import { useBalancedLayout } from "@/hooks/useBalancedLayout";
import { PRETEXT_SERIF } from "@/lib/font-stacks";

type BalancedTextProps = {
  children: string;
  className?: string;
  fontFamily?: string;
  fontSizePx?: number;
  lineHeightPx?: number;
  fontWeight?: number | string;
  justify?: boolean;
};

export function BalancedText({
  children,
  className = "",
  fontFamily = PRETEXT_SERIF,
  fontSizePx = 17,
  lineHeightPx = 28,
  fontWeight = 400,
  justify = true,
}: BalancedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);
  const w = Math.max(0, width - 1);
  const { lines, height } = useBalancedLayout({
    text: children,
    width: w,
    fontSizePx,
    lineHeightPx,
    fontFamily,
    fontWeight,
  });

  const baseStyle = {
    fontSize: `${fontSizePx}px`,
    lineHeight: `${lineHeightPx}px`,
    fontWeight,
    fontFamily,
  } as const;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        minHeight: w > 0 && lines.length ? `${height}px` : undefined,
        textAlign: justify ? "justify" : "start",
        textWrap: "balance" as const,
      }}
    >
      {lines.length === 0 ? (
        <p style={baseStyle}>{children}</p>
      ) : (
        lines.map((line, i) => (
          <span key={i} className="block" style={baseStyle}>
            {line.text}
          </span>
        ))
      )}
    </div>
  );
}
