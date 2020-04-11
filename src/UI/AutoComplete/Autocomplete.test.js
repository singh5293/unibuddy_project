import React from "react";
import { render } from "@testing-library/react";
import { search } from "../../Services/Search";
import debounce from "../../Services/Search/debounce";
import Autocomplete from "./Autocomplete";

test("renders card list with given className,title,author and summary", () => {
  const setQueryText = jest.fn();
  const setCardToAdd = jest.fn();

  const { getByTestId, getByText } = render(
    <Autocomplete
      query={"problems"}
      handleInputChange={setQueryText}
      itemsCount={10}
      handleListAddition={setCardToAdd}
    />
  );
  expect(getByTestId("autocomplete")).toHaveClass("Autocomplete");
});
