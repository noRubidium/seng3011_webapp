import React, {PropTypes} from 'react';
import $ from 'jquery';
import TradingHistory from './TradingHistory';

const ranking_data = [
  {
    name: 'Anonymous user',
    total_profit: 12309.37,
    history: [],
  },
  {
    name: 'Anonymous user',
    total_profit: 10909.00,
    history: [],
  },
  {
    name: 'Anonymous user',
    total_profit: 10029.30,
    history: [],
  },
  {
    name: 'Anonymous user',
    total_profit: 9928.00,
    history: [],
  },
  {
    name: 'Anonymous user',
    total_profit: 9820.00,
    history: [],
  },
];

class ResultPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
    <div className='modal fade' id={this.props.id} tabIndex='-1' role='dialog'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
            <h4 className='modal-title'>View Details</h4>
          </div>
          <div className='modal-body'>
            <TradingHistory history={this.props.history} />
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default class ResultRanking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;

    const rankings = ranking_data.map((e, i) => {

      return (<div key={i} className='holding-item' style={{margin: '10px 0'}}>
        <div className='company-name'>
          No. {1 + i} - {e.name}
        </div>
        <div>
          <div className='col-md-6'>
            Total profit: ${e.total_profit.toFixed(2)}
          </div>
          <div className='col-md-6'>
            <button href='#' className='btn btn-success' style={{float: 'right'}} data-toggle="modal" data-target={`#details-popup-${i}`}> View details </button>
            <ResultPopup id={`details-popup-${i}`} history={history}/>
          </div>
        </div>
      </div>
    )});

    return (<div className='white-bg'>
      <div className='sub-title'>Ranking for global users</div>
      <div>You have made ${(this.props.balance - 100000).toFixed(2)}</div>
      <div>
        { rankings }
      </div>
    </div>);
  }
}

ResultRanking.propTypes = {
};
