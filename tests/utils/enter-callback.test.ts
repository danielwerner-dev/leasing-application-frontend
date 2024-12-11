import enterCallback from "../../src/lib/utils/enter-callback";

jest.mock("../../src/lib/utils/enter-callback", () => {
  const mockFunction = jest.requireActual("../../src/lib/utils/enter-callback");

  return {
    __esModule: true,
    ...mockFunction,
  };
});

describe("enter callback", () => {
  let testFunction1: () => string;

  beforeEach(() => {
    testFunction1 = jest.fn(() => "hello world");
  });

  it("executes callback when key pressed is enter", () => {
    enterCallback(testFunction1)({ key: "Enter" } as KeyboardEvent);

    expect(testFunction1).toHaveBeenCalled();
  });

  it("does not execute callback when key pressed is not enter", () => {
    enterCallback(testFunction1)({ key: "Space" } as KeyboardEvent);

    expect(testFunction1).not.toHaveBeenCalled();
  });
});
