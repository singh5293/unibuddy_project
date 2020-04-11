import React, { useState } from "react";
import "./App.css";
import Autocomplete from "./UI/AutoComplete/Autocomplete";
import CardList from "./UI/Card/CardList";

function App() {
  const [querytext, setQueryText] = useState("");
  const [cardList, setCardList] = useState([]);
  const [cardToAdd, setCardToAdd] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // add selected item to card list
    setCardList((prevState) => {
      return prevState.concat(cardToAdd);
    });
    setCardToAdd([]);
    setQueryText("");
  };
  return (
    <div className="App">
      <h3 className="title">Search Books</h3>
      <form className="search-form" onSubmit={handleSubmit}>
        <Autocomplete
          query={querytext}
          handleInputChange={setQueryText}
          itemsCount={10}
          handleListAddition={setCardToAdd}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="book-lists">
        <CardList cardList={cardList} />
      </div>
    </div>
  );
}

export default App;
