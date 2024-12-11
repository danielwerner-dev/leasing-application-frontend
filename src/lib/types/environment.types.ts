import type { clientSideVariables, variables } from "../../../config/variables";

export type envKeys = keyof typeof variables;
export type clientEnvKeys = keyof typeof clientSideVariables;

export type EnvConfigInput<T extends string | number | symbol = envKeys> =
  Record<T, string>;
export type EnvConfigOutput<T extends string | number | symbol = envKeys> =
  Record<T, string | null>;
