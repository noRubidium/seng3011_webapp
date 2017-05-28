import React from 'react';
import { connect } from 'react-redux';

import StockChartFlag from 'components/StockChart/flag.js';
import IndustryChart from 'components/Industry/chart';
import { getCmp, getType } from 'utils/lookup';
import { load_companies, load_abs_stats } from 'actions/company_list';
import { load_company_stats } from 'actions/company/stats';

import PortGame from 'components/Port/Game';
import PortResult from 'components/Port/Result';


export default class Playground extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        step: 0,
        history: [],
        balance: 100000,
        date: new Date('2015-01-01')
    };

  }

  nextStep () {
      this.setState({step: this.state.step + 1});
  }
  render () {
    const { industry:category } = this.props;
    switch (this.state.step) {
        case 0:
        case 1:
        case 2:
        case 3:
            return (<PortGame {...this.state} />);
        default:
            return (<PortResult {...this.state} />);

    }
    return (<div>Unimplemented</div>);
  }
}
