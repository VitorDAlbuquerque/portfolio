"use client";

import { useEffect, useMemo, useState, type RefObject } from "react";

import { calculateOptimalFontSize, type FitMode } from "@/lib/pretext/calculateOptimalFontSize";

export type UseResponsiveTextOptions = {
  text: string;
  containerWidth: number;
  fontFamily: string;
  minSize: number;
  maxSize: number;
  mode?: FitMode;
  maxLines?: number;
  lineHeightRatio?: number;
  fontWeight?: number | string;
};

export function useResponsiveText({
  text,
  containerWidth,
  fontFamily,
  minSize,
  maxSize,
  mode = "singleLineWidth",
  maxLines = 1,
  lineHeightRatio = 1.25,
  fontWeight = 400,
}: UseResponsiveTextOptions) {
  const fontSize = useMemo(
    () =>
      calculateOptimalFontSize(text, containerWidth, fontFamily, {
        minSize,
        maxSize,
        mode,
        maxLines,
        lineHeightRatio,
        fontWeight,
      }),
    [
      text,
      containerWidth,
      fontFamily,
      minSize,
      maxSize,
      mode,
      maxLines,
      lineHeightRatio,
      fontWeight,
    ]
  );

  return { fontSize, lineHeight: Math.round(fontSize * lineHeightRatio) };
}

export function useElementWidth<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      setWidth(w);
    });
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, [ref]);

  return width;
}
