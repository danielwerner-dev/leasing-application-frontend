/**
 * @jest-environment  jsdom
 */
import { trackGTMEvent } from "$lib/utils/gtm";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

describe("GTM", () => {
  describe("Track GTM event", () => {
    beforeEach(() => {
      window.dataLayer = [];
      jest.spyOn(window.dataLayer, "push");
    });

    it("push event when GTM tracking is enabled", () => {
      const eventObject = { foo: "bar" };
      trackGTMEvent(eventObject, true, window);

      expect(window?.dataLayer?.push).toBeCalledWith(eventObject);
    });

    it("don't push event when GTM tracking is off", () => {
      trackGTMEvent({ foo: "bar" }, false, window);

      expect(window?.dataLayer?.push).not.toBeCalled();
    });

    it("don't throw error if window is not defined", () => {
      expect(() =>
        trackGTMEvent({ foo: "bar" }, true, undefined)
      ).not.toThrow();
    });

    it("don't throw error if dataLayer is not defined", () => {
      window.dataLayer = undefined;

      expect(() => trackGTMEvent({ foo: "bar" }, true, window)).not.toThrow();
    });
  });
});
