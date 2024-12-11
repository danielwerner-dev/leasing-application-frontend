# Parsers

Parsers will be used for the application to abstract the logic around translating data from the Leasing Application Service to the Leasing Application UI and vice-versa.

## Types of parser

There are two types of parser and one other method to return the section template (payload for an empty section):

1. `toFrontend` parser:

   - Receives `BackendInterface` as an argument and parses it to `FrontendInterface`

1. `toBackend` parser:

   - Receives `FrontendInterface` data as an argument and parses it to `BackendInterface`

1. `getTemplate`:

   - Get template of the initial state for a section that hasn't been filled yet. Returns a `TemplateInterface`

## Abstract class Parser

The abstract class `Parser` will define the methods for the defined [Types of parser](#types-of-parser).

## Format specifications

1. `BackendInterface`: backend interfaces will be named as `Backend` + `[SECTION_NAME]` (e.g. BackendGeneral).

   - The property names for `BackendInterfaces` will use `snake_case`

2. `FrontendInterface`: frontend interfaces will be named as `Frontend` + `[SECTION_NAME]` (e.g. FrontendGeneral).

   - The property names for `FrontendInterface` will use `camelCase`

3. `TemplateInterface`: frontend interface for an empty form section. They will be named `Template` + `[SECTION_NAME]` (e.g. TemplateGeneral)

   - The property names for `TemplateInterface` will use `camelCase`
