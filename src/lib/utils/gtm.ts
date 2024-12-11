export function trackGTMEvent(
  gtmEventObj: Record<string, unknown>,
  gtmEnabled: boolean,
  window?: Window
): void {
  if (!gtmEnabled) return;
  if (!window) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(gtmEventObj);
}
