import React from "react";
import { render } from "@testing-library/react";
import CardList from "./CardList";
import { cardList } from "../../mockData/testData";

test("renders card list with given className", () => {
  const { getByTestId } = render(<CardList cardList={cardList} />);
  expect(getByTestId("card-items")).toHaveClass("card-items");
});
