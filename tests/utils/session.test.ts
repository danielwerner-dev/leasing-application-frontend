/** @jest-environment jsdom */
import connector from "$lib/client-connectors/customer-profile";
import * as cookieManagement from "$lib/utils/cookie-management";
import * as session from "$lib/utils/session";

jest.mock("$lib/client-connectors/customer-profile");

jest.useFakeTimers();

describe("Session tests", () => {
  beforeEach(() => {
    jest
      .spyOn(cookieManagement, "setCookie")
      .mockImplementation(() => undefined);
    jest.spyOn(global, "setTimeout");
  });

  describe("Init session", () => {
    it("Should set timeout", () => {
      session.initSession("devinvh.com");

      expect(setTimeout).toHaveBeenCalledTimes(1);
    });
  });

  describe("timeoutHandler", () => {
    it("Should call refreshToken and set a new timeout", async () => {
      jest.spyOn(Date, "now").mockReturnValue(0);
      const refreshTokenMock = jest
        .spyOn(connector, "refreshToken")
        .mockImplementationOnce(() => Promise.resolve());

      await session.timeoutHandler("devinvh.com")();
      expect(refreshTokenMock).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledTimes(1);
    });

    it("Should call the logout method", () => {
      jest.spyOn(Date, "now").mockReturnValue(Infinity);
      jest.spyOn(connector, "logout");

      session.timeoutHandler("devinvh.com")();

      expect(connector.logout).toHaveBeenCalledTimes(1);
    });

    it("Should set refreshTokenError to true when refreshToken call fails", async () => {
      jest.spyOn(Date, "now").mockReturnValue(0);
      jest
        .spyOn(connector, "refreshToken")
        .mockImplementationOnce(() => Promise.reject(new Error("the error")));

      await session.timeoutHandler("devinvh.com")();
      expect(session.refreshTokenError).toBe(true);
    });

    describe("getRefreshTokenStatus", () => {
      it("Should throw an error when refreshTokenError === true", async () => {
        jest.spyOn(Date, "now").mockReturnValue(0);
        jest
          .spyOn(connector, "refreshToken")
          .mockImplementationOnce(() => Promise.reject(new Error("the error")));

        await session.timeoutHandler("devinvh.com")();
        expect(() => session.getRefreshTokenStatus()).toThrowError(
          "Error refreshing token"
        );
      });
    });
  });

  describe("logoutUser", () => {
    Object.defineProperty(window, "location", {
      value: { reload: jest.fn() },
    });

    const logoutMock = jest.spyOn(connector, "logout");
    it("Should set update the value of lastInteraction", () => {
      session.logoutUser("devinvh.com");

      expect(logoutMock).toHaveBeenCalledTimes(1);
    });

    it("Should call setCookie 3 times", () => {
      logoutMock.mockImplementation(() => {
        throw new DOMException();
      });

      session.logoutUser("devinvh.com");

      expect(cookieManagement.setCookie).toHaveBeenCalledTimes(3);
    });

    it("When window is defined it should call window.location.reload", async () => {
      jest.spyOn(window.location, "reload").mockImplementation(jest.fn());

      await session.logoutUser("devinvh.com");

      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  describe("userInteractionHandler", () => {
    it("Should set update the value of lastInteraction", () => {
      jest.useRealTimers();
      const initialLastInteration = session.lastInteraction;

      session.userInteractionHandler();

      expect(session.lastInteraction).not.toEqual(initialLastInteration);
    });
  });
});
