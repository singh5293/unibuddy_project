import React from "react";
import { search } from "../../Services/Search";
import debounce from "../../Services/Search/debounce";
import "./Autocomplete.css";

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuggestions: false,
      filteredSuggestions: [],
      activeSuggestion: 0,
    };
    this.autocompleteSearchDebounced = debounce(this.getSuggestionList, 1000);
  }

  getSuggestionList = (queryText) => {
    if (queryText) {
      let res = search(queryText, this.props.itemsCount);
      this.setState({ showSuggestions: true, filteredSuggestions: res });
    } else {
      this.setState({ showSuggestions: false });
    }
  };

  onChange = (value) => {
    this.props.handleInputChange(value);
    this.autocompleteSearchDebounced(value);
  };

  onClick = (e, suggestion) => {
    console.log(
      "onclick",
      suggestion,
      e.target.value,
      e.currentTarget.innerText
    );
    this.props.handleInputChange(e.currentTarget.innerText);
    let ListItem = {
      title: suggestion.title,
      summary: suggestion.summary,
      author: suggestion.author[0].author,
      id: suggestion.id,
    };
    this.props.handleListAddition(ListItem);
    this.setState({
      showSuggestions: false,
      activeSuggestion: 0,
      filteredSuggestions: [],
    });
  };

  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
      });

      this.props.handleInputChange(
        filteredSuggestions[activeSuggestion] &&
          filteredSuggestions[activeSuggestion].title
      );
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };
  render() {
    let suggestionsListComponent;
    let { showSuggestions, filteredSuggestions, activeSuggestion } = this.state;
    if (showSuggestions) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion.id}
                  onClick={(e) => this.onClick(e, suggestion)}
                >
                  {suggestion.title}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions</em>
          </div>
        );
      }
    }

    return (
      <div data-testid="autocomplete" className="Autocomplete">
        <input
          type="text"
          onChange={(e) => this.onChange(e.target.value)}
          onKeyDown={this.onKeyDown}
          value={this.props.query}
        />
        {suggestionsListComponent}
      </div>
    );
  }
}

export default AutoComplete;
