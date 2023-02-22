import filesReducer, { reset } from "./filesSlice";

describe("counter reducer", () => {
  const initialState = {
    files: [],
    categories: [],
    temp_files: [],
    file: {},
    noaccess: [],
    isLoading: true,
    isSuccess: true,
    isError: false,
    message: "",
  };

  it("should handle initial state", () => {
    expect(filesReducer(undefined, { type: "unknown" })).toEqual({
      files: [],
      categories: [],
      temp_files: [],
      file: {},
      noaccess: [],
      isLoading: false,
      isSuccess: false,
      isError: false,
      message: "",
    });
  });

  it("should handle reset", () => {
    const after_reset = filesReducer(initialState, reset());
    expect(after_reset.value).toBeFalsy();
  });
});
