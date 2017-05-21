import React from 'react';
import { connect } from 'react-redux';

import CompareStats from 'components/Compare';
import CompareChart from 'components/CompareChart';
import LoadableComponent from 'components/LoadableComponent';
import csv2json from 'utils/csv2json';


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
    };
    this.loadCompareData();
  }

  loadCompareData() {
    const { started } = this.state;

    if (started) {
      return;
    }
    const companies = this.getCompanies();
    this.setState({started: true, data: []});
    companies.map((cid) => {
      fetch(`http://api.kaiworship.xyz/cmp/${cid}`)
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
        console.log(finished, finished === companies.length - 1);
        this.setState({
          finished: finished + 1,
          loading: loading - 1,
          data: data.concat([{label: cid, values: result}])
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
          <CompareChart {...props}/>
        </center>
        <CompareStats {...props}/>
      </div>
    );
  }
}
