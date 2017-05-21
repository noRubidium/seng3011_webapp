import React from 'react';

export default class IndustryStatistics extends React.Component {
  render() {
    const { stats } = this.props;
    const { sd, trend } = stats;
    return(
      <div>
        <div className='sub-title'>Statistics</div>
        <div className='stats'>
          <div className='sd'> Standard Deviation: {sd} </div>
          <div className='trend'> Trend: {trend} </div>
        </div>
      </div>
    );
  }
}
