/**
 * @jest-environment jsdom
 */
import {
  formatCookie,
  parseCookie,
  setCookie,
} from "$lib/utils/cookie-management";

jest.mock("jwt-decode");

Object.defineProperty(window.document, "cookie", {
  writable: true,
});

Object.defineProperty(window, "location", {
  value: {
    hostname: "www.invitationhomes.com",
  },
});

describe("Cookie Management", () => {
  describe("formatCookie", () => {
    it("returns the cookie well formated", () => {
      const cookieExpected =
        "accessToken=1234abcd; Max-Age=3600; Domain=devinvh.com; Path=/; SameSite=Lax; Secure;";

      const cookieOptions = {
        domain: "devinvh.com",
        path: "/",
        secure: true,
        maxAge: 3600,
      };
      const cookie = formatCookie(
        "accessToken",
        "1234abcd",
        "devinvh.com",
        cookieOptions
      );

      expect(cookie).toEqual(cookieExpected);
    });

    it("formats the cookie with `expires` option", () => {
      const cookieExpected =
        "accessToken=1234abcd; Expires=3600; Domain=devinvh.com; Path=/; SameSite=Lax; Secure;";

      const cookieOptions = {
        domain: "devinvh.com",
        path: "/",
        secure: true,
        expires: "3600",
      };
      const cookie = formatCookie(
        "accessToken",
        "1234abcd",
        "devinvh.com",
        cookieOptions
      );

      expect(cookie).toEqual(cookieExpected);
    });

    it("formats the cookie with no options", () => {
      const cookieExpected =
        "accessToken=1234abcd; Expires=Fri, 01 Jan 9999 00:00:00 GMT; Domain=devinvh.com; Path=/;";

      const cookie = formatCookie(
        "accessToken",
        "1234abcd",
        "devinvh.com",
        null as any
      );

      expect(cookie).toEqual(cookieExpected);
    });
  });

  describe("setCookie", () => {
    it("sets a cookie in the document", () => {
      setCookie("cookieId", "devinvh.com", "1");

      expect(document.cookie).not.toBeFalsy();
    });
  });

  describe("parseCookie", () => {
    it("Should extract keys of cookie string", () => {
      const cookieToParse =
        "cookieId=1; expires=Fri, 01 Jan 9999 00:00:00 GMT; secure=true;";
      const resultCookieObject = {
        cookieId: "1",
        expires: "Fri, 01 Jan 9999 00:00:00 GMT",
        secure: "true",
      };
      const result = parseCookie(cookieToParse);
      expect(result).toMatchObject(resultCookieObject);
    });

    it("throws if cookie is not of type string", () => {
      expect(() => parseCookie(1234 as any)).toThrow();
    });
  });
});
