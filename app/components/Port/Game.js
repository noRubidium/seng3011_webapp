import React, {PropTypes} from 'react';

import SearchCompanyPanel from './SearchCompanyPanel';
import Holdings from './Holdings';
import csv2json from 'utils/csv2json';

const format_date = (d) => d.toISOString().split('T')[0];

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
    if (company === this.state.company) return;
    this.setState({company, loading: true, loaded: false, error: false});
    const start_date = new Date(this.props.date);
    start_date.setYear(start_date.getFullYear() - 1);
    const end_date = this.props.date;
    fetch(`${process.env.API_URL}/cmp/${company}.AX/${format_date(start_date)}/${format_date(end_date)}`)
    .then((r) => r.text())
    .then((d) => {
      if (this.state.company !== company) return;
      if (!d) {
        this.setState({loading: false, error: true});
      }
      const result = csv2json(d);
      this.setState({loading: false, loaded: true, data: result});
      console.log(result);
    })
    .catch((e) => {
      if (this.state.company !== company) return;
      this.setState({loading: false, error: true});
    })
  }

  render() {
    return (<div>
      <div> This is the game </div>
      <div> current date is : {this.props.date.toISOString().split('T')[0]} </div>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <SearchCompanyPanel {...this.state} updateCompany={this.updateCompany.bind(this)}/>
        </div>
        <div className="col-sm-12 col-md-6">
          <Holdings { ...this.state } />
        </div>
      </div>
    </div>);
  }
}

PortGame.propTypes = {
};
