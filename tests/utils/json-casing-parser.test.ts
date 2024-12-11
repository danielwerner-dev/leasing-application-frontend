import * as util from "$lib/utils/json-casing-parser";

describe("JSON casing parser", () => {
  let camelCased: any;
  let snakeCased: any;
  beforeEach(() => {
    camelCased = {
      myProperty: {
        myString: "hello_world",
        withNumber1: "helloToo",
        myNestedProperty: [
          {
            myArrayNested: {
              finalField: true,
              theAboveLied: "hello_worldCamel-one",
            },
          },
        ],
      },
    };

    snakeCased = {
      my_property: {
        my_string: "hello_world",
        with_number_1: "helloToo",
        my_nested_property: [
          {
            my_array_nested: {
              final_field: true,
              the_above_lied: "hello_worldCamel-one",
            },
          },
        ],
      },
    };
  });

  describe("Parse from camelCase to snakeCase", () => {
    it("should convert JSON from camel case to snake case", () => {
      const parsed = util.jsonCasingParser(
        camelCased,
        util.CasingPattern.SNAKE
      );

      expect(parsed).toEqual(snakeCased);
    });
  });

  describe("Parse from snakeCase to camelCase", () => {
    it("should convert JSON from snake case to camel case", () => {
      const parsed = util.jsonCasingParser(
        snakeCased,
        util.CasingPattern.CAMEL
      );

      expect(parsed).toEqual(camelCased);
    });
  });

  describe("If target payload is stringified", () => {
    it("returns stringified payload", () => {
      const snakeString = JSON.stringify(snakeCased);
      const camelString = JSON.stringify(camelCased);

      const parsed = util.jsonCasingParser(
        snakeString,
        util.CasingPattern.CAMEL
      );

      expect(parsed).toEqual(camelString);
    });
  });

  describe("Parsing stringified and edge cases", () => {
    it("should not convert JSON is CasingType does not exist", () => {
      const resSnake = util.jsonCasingParser(snakeCased, undefined as any);
      const resCamel = util.jsonCasingParser(camelCased, undefined as any);

      expect(resSnake).toEqual(snakeCased);
      expect(resCamel).toEqual(camelCased);
    });

    it("should not break with a silent underscore at the end", () => {
      const target = {
        hello_: "world",
      };

      const parsed = util.jsonCasingParser(target, util.CasingPattern.CAMEL);

      expect(parsed).toEqual({ hello_: "world" });
    });
  });
});
