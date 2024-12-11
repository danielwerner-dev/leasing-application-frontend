import * as DDLogs from "@datadog/browser-logs";
import winston from "winston";

import logger from "$lib/utils/logger";
import { ClientSideLogger } from "$lib/utils/logger/logger.client";
import { ServerSideLogger } from "$lib/utils/logger/logger.server";

jest.mock("winston", () => {
  return {
    createLogger: () => ({
      log: jest.fn(),
      add: jest.fn(),
    }),
    format: {
      json: jest.fn(),
      simple: jest.fn(),
    },
    transports: {
      Http: jest.fn(),
      Console: jest.fn(),
    },
  };
});

jest.mock("@datadog/browser-logs", () => {
  return {
    datadogLogs: {
      init: jest.fn(),
      logger: {
        log: jest.fn(),
      },
    },
  };
});

describe("Logger tests", () => {
  describe("When a logger is not defined", () => {
    it("uses console as logger", () => {
      logger.info("hello world");

      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalled();
    });
  });

  describe("When logger is instrumented with ServerSideLogger", () => {
    it("initialize and log to the serverLogger", () => {
      jest.spyOn(winston, "createLogger");

      const serverLogger = new ServerSideLogger({} as any);

      logger.init(serverLogger);

      expect(winston.createLogger).toHaveBeenCalled();

      jest.spyOn(serverLogger, "log");
      logger.debug("hello");
      logger.info("hello");
      logger.warn("hello");
      logger.error("hello");

      expect(serverLogger.log).toHaveBeenCalledTimes(4);
    });
  });

  describe("When logger is instrumented with ClientSideLogger", () => {
    it("initialize and log to the clientLogger", () => {
      jest.spyOn(DDLogs.datadogLogs, "init");

      const clientLogger = new ClientSideLogger({} as any);

      logger.init(clientLogger);

      expect(DDLogs.datadogLogs.init).toHaveBeenCalled();

      jest.spyOn(clientLogger, "log");
      logger.debug("hello");
      logger.info("hello");
      logger.warn("hello");
      logger.error("hello");

      expect(clientLogger.log).toHaveBeenCalledTimes(4);
    });
  });
});
