import React, {PropTypes} from 'react';

import SearchBar from 'components/SearchBar';

export default class SearchCompanyPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SearchBar callback={this.props.updateCompany}/>
      </div>
    );
  }
}

SearchCompanyPanel.propTypes = {
};
