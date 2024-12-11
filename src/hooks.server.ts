import type { Handle, RequestEvent } from "@sveltejs/kit";

import { config } from "$lib/config/environment.server";
import CustomerService from "$lib/connectors/customer-service";
import LeasingApplicationService from "$lib/connectors/leasing-application-service";
import PropertyService from "$lib/connectors/pls";
import logger from "$lib/utils/logger";
import { ServerSideLogger } from "$lib/utils/logger/logger.server";

const {
  PLS_URL,
  CUSTOMER_SERVICE_URL,
  LEASING_APPLICATION_SERVICE_URL,
  DD_ENV,
  DD_SERVICE,
  DD_API_KEY,
} = config.env;

const serverLogger = new ServerSideLogger({
  apiKey: DD_API_KEY,
  environment: DD_ENV,
  service: DD_SERVICE,
});

logger.init(serverLogger);

if (!LEASING_APPLICATION_SERVICE_URL) {
  throw new Error(
    "Can't start application without Leasing Application Service URL."
  );
}

if (!PLS_URL) {
  throw new Error("Can't start application without Property API URL.");
}

if (!CUSTOMER_SERVICE_URL) {
  throw new Error("Cant's start application without Customer Service URL.");
}

LeasingApplicationService.connect(LEASING_APPLICATION_SERVICE_URL);
PropertyService.connect(PLS_URL);
CustomerService.connect(CUSTOMER_SERVICE_URL);

export const handle: Handle = async ({ event, resolve }) => {
  logger.info(`Resolving request to: ${event.request.url}`);
  const response = await resolve(event);

  appendHeaders(event, response);

  return response;
};

const appendHeaders = (event: RequestEvent, res: Response) => {
  res.headers.append("X-Content-Type-Options", "nosniff");
};
