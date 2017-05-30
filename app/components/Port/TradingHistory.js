import React, {PropTypes} from 'react';

const format_date = (d) => d.toISOString().split('T')[0];

export default class TradingHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history=[] } = this.props;
    const history_content = history.map((h, i) => h.company === 'END_OF_PERIOD' ?
    <div key={i}>
      <hr></hr>
      <div className='company-name'>
        Period from {format_date(h.start_date)} - {format_date(h.end_date)}
      </div>
    </div>
    : (
      <div className='list-group-item ' key={i}>
        <div className='company-name'>Holding {h.amount} shares of {h.company} on {format_date(h.date)} </div>
        <div>
          {h.price < h.open_price ? 'Lost' : 'Gained'} ${Math.abs(h.amount * (h.price - h.open_price)).toFixed(2)}
        </div>
      </div>
    ))
    return (<div className='white-bg'>
      <div className='sub-title'> Trading History </div>
      <div className='list-group holding-item'>
        { history_content }
      </div>
    </div>);
  }
}

TradingHistory.propTypes = {
};
