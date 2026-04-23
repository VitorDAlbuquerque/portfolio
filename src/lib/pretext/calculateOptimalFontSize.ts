import { layout, prepare, prepareWithSegments, measureNaturalWidth } from "@chenglou/pretext";

import { canvasFont } from "./font";

export type FitMode = "singleLineWidth" | "box";

export function calculateOptimalFontSize(
  text: string,
  containerWidth: number,
  fontFamily: string,
  options: {
    minSize: number;
    maxSize: number;
    mode?: FitMode;
    maxLines?: number;
    lineHeightRatio?: number;
    fontWeight?: number | string;
  }
): number {
  const {
    minSize,
    maxSize,
    mode = "singleLineWidth",
    maxLines = 1,
    lineHeightRatio = 1.25,
    fontWeight = 400,
  } = options;

  if (typeof window === "undefined" || !text.trim() || containerWidth <= 0) {
    return minSize;
  }

  let lo = minSize;
  let hi = maxSize;
  let best = minSize;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const font = canvasFont(mid, fontFamily, fontWeight);

    if (mode === "singleLineWidth" && maxLines === 1) {
      const prepared = prepareWithSegments(text, font);
      const w = measureNaturalWidth(prepared);
      if (w <= containerWidth) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    } else {
      const prepared = prepare(text, font);
      const lineHeight = Math.max(1, Math.round(mid * lineHeightRatio));
      const { lineCount } = layout(prepared, containerWidth, lineHeight);
      if (lineCount <= maxLines) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
  }

  return best;
}
