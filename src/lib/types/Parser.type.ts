export interface TemplateOptions {
  marketSlug: string;
}

abstract class Parser {
  abstract toFrontend(data: unknown): unknown;
  abstract toBackend(data: unknown): unknown;
  abstract getTemplate(options: unknown): unknown;
}

export default Parser;
