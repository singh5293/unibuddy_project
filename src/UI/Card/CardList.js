import React from "react";
import Card from "./Card";
import "./Card.css";

const CardList = ({ cardList }) => {
  return (
    <div data-testid="card-items" className="card-items">
      {cardList.map((card) => {
        return (
          <Card
            key={card.id}
            title={card.title}
            summary={card.summary}
            author={card.author}
          />
        );
      })}
    </div>
  );
};

export default CardList;
