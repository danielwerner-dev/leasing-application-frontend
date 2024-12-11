import jwtDecode from "jwt-decode";

import { parseCookie } from "$lib/utils/cookie-management";
import logger from "$lib/utils/logger";

import { CasingPattern, jsonCasingParser } from "./json-casing-parser";

interface Credentials {
  customerId?: string;
  idToken?: string;
}

interface ParsedIdToken {
  customerId: string;
}

type GetCredentials = (cookies: string) => Credentials;

export const getCredentials: GetCredentials = (cookies) => {
  try {
    const { idToken = "" } = parseCookie(cookies);
    const decodedToken = jwtDecode<ParsedIdToken>(idToken);
    const { customerId } = jsonCasingParser(decodedToken, CasingPattern.CAMEL);

    return {
      customerId,
      idToken,
    };
  } catch (err) {
    logger.error("[Invalid credentials]", { error: err as Error });
    return {};
  }
};
