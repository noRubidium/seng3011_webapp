import React from 'react';
import Autosuggest from 'react-autosuggest';

import data from './data.json';
import './main.css';
import { withRouter } from 'react-router';

const companies = data.data;

const renderSuggestionsContainer = ({ containerProps, children }) => {
  const { ref, ...restContainerProps } = containerProps;
  const callRef = isolatedScroll => {
    if (isolatedScroll !== null) {
      ref(isolatedScroll.component);
    }
  };

  return (
    <IsolatedScroll ref={callRef} {...restContainerProps}>
      {children}
    </IsolatedScroll>
  );
}


const escapeRegexCharacters = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const getSuggestions = (value) => {
  const escapedValue = escapeRegexCharacters(value.trim())
  const loseMatchRegex = escapedValue.replace(new RegExp('.', 'g'), (match) => `${match}[^-()&\\s]*?\\s?[^-()&\\s]*?`);
  // console.log()
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp(`${escapedValue}`, 'i');
  const exactMatch = companies.filter(company => regex.test(getSuggestionValue(company)));
  if (exactMatch.length < 50) {
    const loseRegex = new RegExp(`\\b${loseMatchRegex}`, 'i');
    const loseMatch = companies.filter(company => loseRegex.test(getSuggestionValue(company)) && !exactMatch.includes(company));
    return exactMatch.concat(loseMatch).slice(0, 50);
  }
  return exactMatch.slice(0, 50);
}

const getSuggestionValue = (suggestion) => {
  return `${suggestion.name}(${suggestion.id}) - ${suggestion.industry}`;
}

const renderSuggestion = (suggestion, { query }) => {
  const suggestionText = getSuggestionValue(suggestion);
  const escapedValue = escapeRegexCharacters(query.trim()).replace(new RegExp('.', 'g'), (match) => `${match}[^-()&\\s]*?\\s?[^-()&\\s]*?`);

  const segs = suggestionText
    .replace(new RegExp(`${escapedValue}`, 'ig'), (m) =>`***${m}***`)
    .split('***');
  const renderedSegs = segs.map((txt, i) => {
    const className = i % 2 === 1 ? 'highlight' : null;
    return <span className={className} key={i}>{txt}</span>;
  });

  return (
    <span className="name">
      {renderedSegs}
    </span>
  );
}



class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.history.push(`/company/${suggestion.id}.AX`);
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type any company names',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        highlightFirstSuggestion={true}
      />
    );
  }
}

const SearchBarRoute = withRouter(SearchBar);
export default SearchBarRoute;
