import { parseStringToNull } from "$lib/utils/parsers/string-to-null";

import { clientSideVariables, variables } from "../../../config/variables";

import type { clientEnvKeys, envKeys } from "$lib/types/environment.types";

import "../../../config/check-environment";

export function getClientConfiguration() {
  return {
    env: parseStringToNull<clientEnvKeys>(clientSideVariables),
  };
}

export const config = {
  env: parseStringToNull<envKeys>(variables),
};
