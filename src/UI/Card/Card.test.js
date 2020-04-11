import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";
import { cardList } from "../../mockData/testData";

test("renders card list with given className,title,author and summary", () => {
  let { title, author, summary } = cardList[0];
  const { getByTestId, getByText } = render(
    <Card title={title} author={author} summary={summary} />
  );
  expect(getByTestId("card-item")).toHaveClass("card");
  expect(getByText(title)).toBeInTheDocument();
  expect(getByText(author)).toBeInTheDocument();
  expect(getByText(summary)).toBeInTheDocument();
});
