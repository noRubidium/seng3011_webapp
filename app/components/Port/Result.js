import React, {PropTypes} from 'react';

import TradingHistory from './TradingHistory';
import ResultRanking from './ResultRanking';

export default class PortResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className='row white-bg'>
      <div className='title'> Result Summary </div>
      <div className='col-sm-12 col-md-6'>
        <TradingHistory history={this.props.history} />
      </div>
      <div className='col-sm-12 col-md-6'>
        <ResultRanking history={this.props.history} />
      </div>
    </div>);
  }
}

PortResult.propTypes = {
};
