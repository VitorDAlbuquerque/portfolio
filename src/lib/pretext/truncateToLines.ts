import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";

import { canvasFont } from "./font";

const ELLIPSIS = "…";

/** Truncate text so Pretext layout uses at most `maxLines` at `maxWidth`. */
export function truncateToMaxLines(
  text: string,
  maxWidth: number,
  maxLines: number,
  fontFamily: string,
  fontSizePx: number,
  lineHeightPx: number,
  fontWeight: number | string = 400
): string {
  if (typeof window === "undefined") {
    return text;
  }
  const font = canvasFont(fontSizePx, fontFamily, fontWeight);
  const preparedFull = prepareWithSegments(text, font);
  const full = layoutWithLines(preparedFull, maxWidth, lineHeightPx);
  if (full.lineCount <= maxLines) return text;

  let lo = 0;
  let hi = text.length;
  let best = 0;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const slice = text.slice(0, mid).trimEnd();
    const candidate = mid >= text.length ? slice : `${slice}${ELLIPSIS}`;
    const prepared = prepareWithSegments(candidate, font);
    const { lineCount } = layoutWithLines(prepared, maxWidth, lineHeightPx);
    if (lineCount <= maxLines) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  if (best >= text.length) return text;
  const base = text.slice(0, best).trimEnd();
  if (!base) return ELLIPSIS;

  let adjusted = `${base}${ELLIPSIS}`;
  let preparedAdj = prepareWithSegments(adjusted, font);
  let laid = layoutWithLines(preparedAdj, maxWidth, lineHeightPx);
  let guard = 0;
  while (laid.lineCount > maxLines && adjusted.length > 1 && guard++ < 4096) {
    const withoutEllipsis = adjusted.endsWith(ELLIPSIS)
      ? adjusted.slice(0, -ELLIPSIS.length)
      : adjusted;
    const nextBase = withoutEllipsis.slice(0, -1).trimEnd();
    adjusted = nextBase ? `${nextBase}${ELLIPSIS}` : ELLIPSIS;
    preparedAdj = prepareWithSegments(adjusted, font);
    laid = layoutWithLines(preparedAdj, maxWidth, lineHeightPx);
  }
  return adjusted;
}
