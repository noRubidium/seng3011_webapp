import React from 'react';
import { connect } from 'react-redux';

import CompareStats from 'components/Compare';
import CompareChart from 'components/CompareChart';
import LoadableComponent from 'components/LoadableComponent';
import csv2json from 'utils/csv2json';
import { getReturn } from 'utils/companyReturn';


@connect((store) => {
  return store.compare;
})
export default class Compare extends React.Component {
  constructor (props) {
    super(props);
    this.loaded_object = null;

    const companies = this.getCompanies();
    this.state = {
      started: false,
      loading: companies.length,
      finished: 0,
      loaded: 0,
      error: true,
      data: [],
      minDate: '2014-01-01',
      maxDate: new Date(),
      companies: companies
    };
    this.loadCompareData();
  }


  updateRange (minDate, maxDate) {
    console.log('MIN, MAX:', minDate, maxDate);
    if (minDate !== this.state.minDate || maxDate !== this.state.maxDate) {
      this.setState({minDate, maxDate});
    }
  }

  loadCompareData() {
    const { started } = this.state;

    if (started) {
      return;
    }
    const companies = this.getCompanies();
    this.setState({started: true, data: []});

    companies.map((cid) => {
      fetch(`http://api.kaiworship.xyz/cmp/${cid}/2014-01-01/2018-01-01`)
      .then((response) => {
        return response.ok ? response.text():null;
      })
      .then((d) => {
        if (!d) {
          this.setState({
            error: true,
            error_msg: `Company: ${cid} data not found`
          });
          return;
        }
        const result = csv2json(d);
        const { finished, data, loading } = this.state;

        this.setState({
          finished: finished + 1,
          loading: loading - 1,
          data: data.concat([getReturn(result, cid)])
        });
        if (finished === companies.length - 1) {
          this.setState({loaded: true});
        }
      });
    });
  }

  getCompanies () {
    const { company_ids='' } = this.props.match.params;
    return company_ids.split(',');
  }

  render () {
    const props = {
      ...this.state,
    };
    const companies = this.getCompanies();
    return (
      <div>
        <div className='title'>
          Comparison for {companies.join(', ')}
        </div>
        <center>
          <CompareChart {...props} updateRange={this.updateRange.bind(this)}/>
        </center>
          <CompareStats {...props}/>
      </div>
    );
  }
}
