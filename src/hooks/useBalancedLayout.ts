"use client";

import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";
import { useMemo } from "react";

import { canvasFont } from "@/lib/pretext/font";

export type BalancedConstraints = {
  text: string;
  width: number;
  fontSizePx: number;
  lineHeightPx: number;
  fontFamily: string;
  fontWeight?: number | string;
};

export function useBalancedLayout({
  text,
  width,
  fontSizePx,
  lineHeightPx,
  fontFamily,
  fontWeight = 400,
}: BalancedConstraints) {
  return useMemo(() => {
    if (typeof window === "undefined" || width <= 0) {
      return { lines: [], height: 0, lineCount: 0 };
    }
    const font = canvasFont(fontSizePx, fontFamily, fontWeight);
    const prepared = prepareWithSegments(text, font);
    return layoutWithLines(prepared, width, lineHeightPx);
  }, [text, width, fontSizePx, lineHeightPx, fontFamily, fontWeight]);
}
