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
      loaded: true,
      error: false,
      balance: 100000,
      currentHoldings: [],
    }
  }

  addCompany (company, price) {
    return (e) => {
      const { currentHoldings } = this.state;
      console.log(e, company, price);
      this.setState({
        currentHoldings: currentHoldings.concat([{
          amount: 0,
          company,
          price,
        }])
      });
    };
  }

  deleteCompany (i) {
    return () => {
      const { currentHoldings=[] } = this.state;
      this.setState({
        currentHoldings: currentHoldings.filter((e, idx) => idx !== i)
      });
    }
  }

  updateHolding (i) {
    return (event) => {
      const { currentHoldings, balance } = this.state;
      const targetObject = this.state.currentHoldings[i];
      const amount = event.target.value.replace(/\D/g, '');
      const v = [{...targetObject, amount }];
      const newHoldings = currentHoldings.slice(0, i).concat(v.concat(currentHoldings.slice(i+1)));

      const spending = newHoldings.map((h) => h.amount * h.price).reduce((a,b) => a + b, 0);
      if (spending > balance) {
        return;
      }
      this.setState({currentHoldings: newHoldings});
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
    })
    .catch((e) => {
      if (this.state.company !== company) return;
      this.setState({loading: false, error: true});
    })
  }

  render() {
    return (<div>
      <h1 style={{textAlign: 'center'}}> Portfolio Management Game</h1>
      <div> current date is:
        {this.props.date.toISOString().split('T')[0]}
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <SearchCompanyPanel {...this.state}
            updateCompany={this.updateCompany.bind(this)}
            addCompany={this.addCompany.bind(this)}
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <Holdings { ...this.state }
            updateHolding={this.updateHolding.bind(this)}
            deleteCompany={this.deleteCompany.bind(this)}/>
        </div>
      </div>
    </div>);
  }
}

PortGame.propTypes = {
};
