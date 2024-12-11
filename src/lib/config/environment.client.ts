import CustomerProfileConnector from "$lib/client-connectors/customer-profile";

import type {
  clientEnvKeys,
  EnvConfigOutput,
} from "$lib/types/environment.types";

export class ClientConfig {
  private static _env: EnvConfigOutput<clientEnvKeys>;
  static get env() {
    if (!ClientConfig._env) {
      return {} as EnvConfigOutput<clientEnvKeys>;
    }

    return ClientConfig._env;
  }

  private static _initialized = false;
  static get initialized() {
    return ClientConfig._initialized;
  }

  static async init(variables: EnvConfigOutput<clientEnvKeys>) {
    if (!variables) {
      throw new Error("Can't initialize environment. Missing variables.");
    }

    const { VITE_CUSTOMER_PROFILE_URL } = variables;
    CustomerProfileConnector.init(VITE_CUSTOMER_PROFILE_URL);

    ClientConfig._env = variables;
    ClientConfig._initialized = true;
  }
}
