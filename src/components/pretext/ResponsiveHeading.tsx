"use client";

import { useRef } from "react";

import { useElementWidth, useResponsiveText } from "@/hooks/useResponsiveText";
import type { FitMode } from "@/lib/pretext/calculateOptimalFontSize";
import { PRETEXT_SANS } from "@/lib/font-stacks";

type ResponsiveHeadingProps = {
  children: string;
  className?: string;
  fontFamily?: string;
  minSize?: number;
  maxSize?: number;
  mode?: FitMode;
  maxLines?: number;
  lineHeightRatio?: number;
  fontWeight?: number | string;
  as?: "h1" | "h2" | "h3";
};

export function ResponsiveHeading({
  children,
  className = "",
  fontFamily = PRETEXT_SANS,
  minSize = 22,
  maxSize = 56,
  mode = "singleLineWidth",
  maxLines = 1,
  lineHeightRatio = 1.15,
  fontWeight = 600,
  as: Tag = "h1",
}: ResponsiveHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);

  const { fontSize } = useResponsiveText({
    text: children,
    containerWidth: Math.max(0, width - 1),
    fontFamily,
    minSize,
    maxSize,
    mode,
    maxLines,
    lineHeightRatio,
    fontWeight,
  });

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <Tag
        className="text-frieren-text transition-[font-size] duration-150"
        style={{
          fontSize: width ? `${fontSize}px` : `${minSize}px`,
          lineHeight: lineHeightRatio,
          fontWeight,
        }}
      >
        {children}
      </Tag>
    </div>
  );
}
