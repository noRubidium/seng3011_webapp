import React, {PropTypes} from 'react';

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

export default class ResultRanking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rankings = ranking_data.map((e, i) => (
      <div key={i} className='holding-item' style={{margin: '10px 0'}}>
        <div className='company-name'>
          No. {1 + i} - {e.name}
        </div>
        <div>
          <div className='col-md-6'>
            Total profit: ${e.total_profit.toFixed(2)}
          </div>
          <div className='col-md-6'>
            <button className='btn btn-success' style={{float: 'right'}}onClick={console.log}>View details</button>
          </div>
        </div>
      </div>
    ))

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
