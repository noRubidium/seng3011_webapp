import React, {PropTypes} from 'react';

import SearchCompanyPanel from './SearchCompanyPanel';

export default class PortGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      loading: false,
      loaded: false,
      error: false,
    }
  }

  updateCompany(company) {
    this.setState({company});
  }

  render() {
    return (<div>
      <div> This is the game </div>
      <div> current date is : {this.props.date.toString()} </div>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <SearchCompanyPanel {...this.props} updateCompany={this.updateCompany.bind(this)}/>
        </div>
        <div className="col-sm-12 col-md-6">
          Panel for result and current management.
          <p> Current company is: {this.state.company}</p>
        </div>
      </div>
    </div>);
  }
}

PortGame.propTypes = {
};
