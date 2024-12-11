import CustomerProfileConnector from "$lib/client-connectors/customer-profile";
import { setCookie } from "$lib/utils/cookie-management";
import logger from "$lib/utils/logger";

export const TIME_UNTIL_LOGOUT_MILLIS = 1000 * 60 * 55; // 55 minutes in milliseconds

export let lastInteraction = Date.now();
export let refreshTokenError = false;

export const getRefreshTokenStatus = () => {
  if (refreshTokenError) {
    throw new Error("Error refreshing token");
  }
};

export const timeoutHandler = (domain: string) => async () => {
  const activityInterval = Date.now() - lastInteraction;

  try {
    if (activityInterval <= TIME_UNTIL_LOGOUT_MILLIS) {
      const delay = TIME_UNTIL_LOGOUT_MILLIS - activityInterval;
      await CustomerProfileConnector.refreshToken();
      setTimeout(timeoutHandler(domain), delay);
    } else {
      await logoutUser(domain);
    }
  } catch (err) {
    refreshTokenError = true;

    logger.error("Error on timeoutHandler", { error: err as Error });
  }
};

export const userInteractionHandler = () => {
  lastInteraction = Date.now();
};

export const logoutUser = async (domain: string) => {
  try {
    await CustomerProfileConnector.logout();
  } catch (e) {
    setCookie("idToken", "", domain);
    setCookie("accessToken", "", domain);
    setCookie("refreshToken", "", domain);
  } finally {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }
};

export const initSession = (domain: string) => {
  setTimeout(timeoutHandler(domain), TIME_UNTIL_LOGOUT_MILLIS);
};
