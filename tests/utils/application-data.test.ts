import { hasUnsavedChanges } from "$lib/utils/application-data";

const testObject = {
  a: 1,
  b: {
    c: 2,
    d: [] as any,
    e: {
      f: 3,
      g: [] as any,
      h: {},
    },
  },
};
const testArray = [
  {
    a: 1,
    b: {
      c: 2,
      d: [] as any,
      e: {
        f: 3,
        g: [] as any,
        h: {},
      },
    },
  },
  {},
];

describe("Application Data", () => {
  describe("hasUnsavedChanges", () => {
    describe("return false for unsaved changes", () => {
      it("when comparing empty objects", () => {
        expect(hasUnsavedChanges({}, {})).toBe(false);
      });
      it("when comparing empty arrays", () => {
        expect(hasUnsavedChanges([], [])).toBe(false);
      });

      it("when comparing same objects", () => {
        expect(hasUnsavedChanges(testObject, testObject)).toBe(false);
      });

      it("when comparing same objects, second is a spread object", () => {
        expect(hasUnsavedChanges(testObject, { ...testObject })).toBe(false);
      });

      it("when comparing same arrays", () => {
        expect(hasUnsavedChanges(testArray, testArray)).toBe(false);
      });
      it("when comparing same arrays, second is a spread array", () => {
        expect(hasUnsavedChanges(testArray, [...testArray])).toBe(false);
      });
    });

    describe("return true for unsaved changes", () => {
      it("when comparing empty object and empty array", () => {
        expect(hasUnsavedChanges({}, [])).toBe(true);
      });

      it("when comparing empty object and undefined", () => {
        expect(hasUnsavedChanges({}, undefined)).toBe(true);
      });
      it("when comparing empty object and null", () => {
        expect(hasUnsavedChanges({}, null)).toBe(true);
      });

      it("when comparing empty array and undefined", () => {
        expect(hasUnsavedChanges([], undefined)).toBe(true);
      });
      it("when comparing empty array and null", () => {
        expect(hasUnsavedChanges([], null)).toBe(true);
      });

      it("when comparing an object an additional key:value", () => {
        expect(hasUnsavedChanges(testObject, { ...testObject, b: 2 })).toBe(
          true
        );
      });

      it("when comparing an array with an additional object/item", () => {
        expect(hasUnsavedChanges(testArray, [...testArray, 1])).toBe(true);
        expect(hasUnsavedChanges(testArray, [...testArray, []])).toBe(true);
        expect(hasUnsavedChanges(testArray, [...testArray, { a: 1 }])).toBe(
          true
        );
        expect(hasUnsavedChanges(testArray, [...testArray, { a: 1 }])).toBe(
          true
        );
      });

      it("when comparing an object with changed values (changed/added nested values)", () => {
        expect(
          hasUnsavedChanges(testObject, {
            ...testObject,
            b: { ...testObject.b, d: [1] },
          })
        ).toBe(true);

        expect(
          hasUnsavedChanges(testObject, {
            ...testObject,
            b: { ...testObject.b, e: { ...testObject.b.e, g: ["Test"] } },
          })
        ).toBe(true);

        expect(
          hasUnsavedChanges(testObject, {
            ...testObject,
            b: { ...testObject.b, e: { ...testObject.b.e, h: { i: true } } },
          })
        ).toBe(true);
      });

      it("when comparing an array with items removed", () => {
        expect(hasUnsavedChanges(testArray, [testArray[0]])).toBe(true);
        expect(hasUnsavedChanges(testArray, [testArray[1]])).toBe(true);
      });

      it("when comparing an array in a different order", () => {
        expect(hasUnsavedChanges(testArray, [testArray[1], testArray[0]])).toBe(
          true
        );
      });
    });
  });
});
