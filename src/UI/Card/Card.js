import React from "react";
import "./Card.css";

const Card = ({ title, author, summary }) => {
  let maxlimit = 200;
  return (
    <div data-testid="card-item" className="card">
      <h3>{title}</h3>
      <p>
        {summary.length > maxlimit
          ? summary.substring(0, maxlimit - 3) + "..."
          : summary}
      </p>
      <hr />
      <p>{author}</p>
    </div>
  );
};

export default Card;
