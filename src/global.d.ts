/// <reference types="@sveltejs/kit" />

declare interface Window {
  dataLayer?: unknown[];
  gtag?(...args: unknown[]): void;
}
