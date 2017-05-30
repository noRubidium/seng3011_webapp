import React, {PropTypes} from 'react';

import SearchCompanyPanel from './SearchCompanyPanel';
import Holdings from './Holdings';
import TradingHistory from './TradingHistory';
import csv2json from 'utils/csv2json';

const format_date = (d) => d.toISOString().split('T')[0];

const holdings_to_history = (date) => {
  return (holding) => {
    return {
      open_price: holding.open_price,
      price: holding.price,
      company: holding.company,
      amount: holding.amount,
      date,
    };
  }
}

export default class PortGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      loading: false,
      loaded: true,
      error: false,
      balance: 100000,
      currentHoldings: this.props.currentHoldings,
    }
  }

  nextStep (e) {
    const { currentHoldings } = this.state;
    const end_date = new Date(this.props.date);
    end_date.setMonth(end_date.getMonth() + 3);
    const histories = currentHoldings.map(holdings_to_history(this.props.date));
    const newHistory = [{company: 'END_OF_PERIOD', start_date: new Date(this.props.date), end_date, profit: histories.reduce((a,b) => a + (b.price - b.open_price) * b.amount, 0)}].concat(histories);
    const newHoldings = currentHoldings.map((e) => {
      return {
        ...e,
        open_price: e.price,
        price: e.price * (0.93 + Math.random() * 0.14)
      };
    })
    const newBalance = this.state.balance - currentHoldings.reduce((a, b) => (a + b.price * b.amount), 0) + newHoldings.reduce((a, b) => a + b.price * b.amount, 0);

    this.setState({
      data: null,
      company: '',
      loading: false,
      loaded: true,
      error: false,
      balance: newBalance,
      currentHoldings: newHoldings,
    });
    this.props.nextStep(newBalance, newHistory, newHoldings);
  }

  addCompany (company, price, open_price) {
    return (e) => {
      const { currentHoldings } = this.state;
      const [currObj] = currentHoldings.filter((e) => e.company === company);
      if ( currObj ) {
        this.setState({
          currentHoldings: [{
            amount: currObj.amount + 100,
            company,
            price,
            open_price,
          }].concat(currentHoldings.filter((e) => e.company !== company))
        });
      } else {
        this.setState({
          currentHoldings: [{
            amount: 100,
            company,
            price,
            open_price,
          }].concat(currentHoldings)
        });
      }
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
    if (company === this.state.company && this.props.date === this.state.loaded_date) return;
    this.setState({company, loading: true, loaded: false, error: false});
    const start_date = new Date(this.props.date);
    start_date.setYear(start_date.getFullYear() - 1);
    const end_date = this.props.date;
    const query_end_date = new Date(this.props.date);
    query_end_date.setMonth(query_end_date.getMonth() + 3);
    fetch(`${process.env.API_URL}/cmp/${company}.AX/${format_date(start_date)}/${format_date(query_end_date)}`)
    .then((r) => r.text())
    .then((d) => {
      if (this.state.company !== company) return;
      if (end_date !== this.props.date) return;
      if (!d) {
        this.setState({loading: false, error: true});
      }
      const complete_stock = csv2json(d);
      const result = complete_stock.filter((e) => new Date(e.date) <= end_date);
      const buy_price = result.length > 0 ? result[result.length - 1] : 0;
      const sell_price = complete_stock.length > 0 ? complete_stock[complete_stock.length - 1] : 0;
      this.setState({
        loading: false,
        loaded: true,
        data: result,
        loaded_date: end_date,
        buy_price,
        sell_price,
      });
    })
    .catch((e) => {
      if (this.state.company !== company) return;
      this.setState({loading: false, error: true});
    })
  }

  render() {
    const trading_history = this.props.history.map((e) => {
      return (<li>
        {e.type} {e.company} {e.amount} shares and {e.price-e.open_price > 0 ? 'gained' : 'loss'} ${ (e.price-e.open_price > 0 ? (e.price-e.open_price) * e.amount : (e.open_price-e.price) * e.amount).toFixed(2) }.
      </li>);
    });
    return (<div className='portfolio'>
      <div className='white-bg'>
        <div className='title'> Portfolio Management Game</div>
        <div> Some stuff here please, like instruction </div>
        <div> current date is: {this.props.date.toISOString().split('T')[0]}</div>
      </div>
      <TradingHistory history={this.props.history} />
      <SearchCompanyPanel {...this.state}
        updateCompany={this.updateCompany.bind(this)}
        addCompany={this.addCompany.bind(this)}
      />
      <div className='white-bg'>
        <Holdings { ...this.state }
          updateHolding={this.updateHolding.bind(this)}
          deleteCompany={this.deleteCompany.bind(this)}
          nextStep = { this.nextStep.bind(this) }/>
      </div>
    </div>);
  }
}

PortGame.propTypes = {
};
