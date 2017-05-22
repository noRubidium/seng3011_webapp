import React from 'react';
import { getStandardDev } from 'utils/statsUtil';

export default class CompareStats extends React.Component {
  render () {
    const { companies, minDate, maxDate, data } = this.props;
    
    const volatilityStats = companies.map(c =>
      <div className='stat-item'>
        <span className='stat-item-company'>{c}</span>
        <span className='stat-item-value'>{'volatility'}</span>
      </div>
    );

    const returnStats = companies.map(c =>
      <div className='stat-item'>
        <span className='stat-item-company'>{c}</span>
        <span className='stat-item-value'>{'return'}</span>
      </div>
    );

    // console.log(this.props);

    return (
      <div className='panel panel-default'>
        <div className='panel-body compare-stats-panel'>
          <div className='row'>
            <div className='col-sm-4 compare-stats'>
              <div className='compare-stats-sub-title sub-title'>
                Volatility
              </div>
              <div>
                {volatilityStats}
              </div>
              {}
            </div>
            <div className='col-sm-4 compare-stats side-border'>
              <div className='compare-stats-sub-title sub-title'>
                Return
              </div>
              <div>
                {returnStats}
              </div>
            </div>
            <div className='col-sm-4 compare-stats'>
              <div className='compare-stats-sub-title sub-title'>
                Stats #3
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
