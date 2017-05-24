import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import CompareStats from 'components/Compare';
import CompareChart from 'components/CompareChart';
import LoadableComponent from 'components/LoadableComponent';
import csv2json from 'utils/csv2json';
import { getReturn } from 'utils/companyReturn';
import { getCmp } from 'utils/lookup';


@connect((store) => {
  return store.compare;
})
export default class Compare extends React.Component {
  constructor (props) {
    super(props);
    this.loaded_object = null;

    const companies = this.getCompanies();
    if (companies.length === 1) {
      return;
    }
    this.state = {
      started: false,
      loading: companies.length,
      finished: 0,
      loaded: 0,
      error: false,
      data: [],
      minDate: new Date(this.props.match.params.start || '2014-01-01'),
      startDate: new Date(this.props.match.params.start || '2014-01-01'),
      maxDate: new Date(),
      companies: [],
    };
    this.actLoad();
  }

  updateRange (minDate, maxDate) {
    if (minDate !== this.state.minDate || maxDate !== this.state.maxDate) {
      this.setState({minDate, maxDate});
    }
  }

  actLoad () {
    const companies = this.getCompanies();
    const sD = this.state.startDate.toISOString().split('T')[0];
    this.setState({started: true, data: [], companies: companies});
    companies.map((cid) => {
      fetch(`http://api.kaiworship.xyz/cmp/${cid}/${sD}/2018-01-01`)
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
        if (data.filter((e) => e.label === cid).length !== 0) {
          this.setState({
            finished: finished + 1,
            loading: loading - 1,
          });
        } else{
          this.setState({
            finished: finished + 1,
            loading: loading - 1,
            data: data.concat([getReturn(result, cid)])
          });
        }

        if (finished === companies.length - 1) {
          this.setState({loaded: true});
        }
      });
    });

  }
  loadCompareData(a = 0) {
    const { started, companies:currCmps, startDate } = this.state;
    const companies = this.getCompanies();


    if (started || (currCmps.toString() === this.getCompanies().toString() && startDate === new Date(this.props.match.params.start))) {
      return;
    }

    this.actLoad();
  }

  setDate (e) {
    if (new Date(e.target.value) === this.state.startDate) {
      return;
    }
    console.log('hi!');
    this.setState({startDate: new Date(e.target.value), started: false});
    this.props.history.push(`/compare/${this.props.match.params.company_ids}/${new Date(e.target.value).toISOString().split('T')[0]}`);
  }

  componentDidUpdate () {
    this.loadCompareData(5);
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
    if (companies.length === 0) {
      return (<Redirect to='/'/>);
    }
    if (companies.length === 1) {
      return (<Redirect to={`/company/${companies[0]}`} />);
    }

    const link_companies = companies.map((v, i) => {
      return (<Link to={`/company/${v}`} key={i}>{(v)},</Link>);
    });

    return (
      <div>
        <div className='title'>
          <div className='news-no-preferences'>
            Comparison for {link_companies}
          </div>
          <p>
            <input  type='date' onChange={this.setDate.bind(this)} value={this.state.startDate.toISOString().split('T')[0]}  max='2017-06-01' min='2000-01-01'
             locale="en-gb"/>
          </p>
        </div>
        <center>
          <CompareChart {...props} updateRange={this.updateRange.bind(this)}/>
        </center>
          <CompareStats {...props}/>
      </div>
    );
  }
}
