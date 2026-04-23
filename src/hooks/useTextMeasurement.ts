"use client";

import { layout, prepare } from "@chenglou/pretext";
import { useMemo } from "react";

import { canvasFont } from "@/lib/pretext/font";

export type TextMeasurementOptions = {
  text: string;
  maxWidth: number;
  fontSizePx: number;
  lineHeightPx: number;
  fontFamily: string;
  fontWeight?: number | string;
};

export function useTextMeasurement({
  text,
  maxWidth,
  fontSizePx,
  lineHeightPx,
  fontFamily,
  fontWeight = 400,
}: TextMeasurementOptions) {
  return useMemo(() => {
    if (typeof window === "undefined" || maxWidth <= 0) {
      return { height: 0, lineCount: 0 };
    }
    const font = canvasFont(fontSizePx, fontFamily, fontWeight);
    const prepared = prepare(text, font);
    return layout(prepared, maxWidth, lineHeightPx);
  }, [text, maxWidth, fontSizePx, lineHeightPx, fontFamily, fontWeight]);
}
