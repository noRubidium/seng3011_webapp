import React from 'react';
import { getStandardDev, getMean } from 'utils/statsUtil';

export default class CompareStats extends React.Component {
  render () {
    const { companies, minDate, maxDate, data } = this.props;
    const min = new Date(minDate);
    const max = new Date(maxDate);
    const volatilityStats = data
    .map((d) => {
      return {label: d.label, value: getStandardDev(d.values, min, max)};
    })
    .sort((a, b) => a.value - b.value)
    .map(d =>
      <div className='stat-item'>
        <span className='stat-item-company'>{d.label}</span>
        <span className='stat-item-value'>{d.value.toFixed(2)}</span>
      </div>
    );

    const returnStats = data
    .map((d) => {
      return {label: d.label, value: getMean(d.values, min, max)};
    })
    .sort((a, b) => a.value - b.value)
    .map((d) =>
      <div className='stat-item'>
        <span className='stat-item-company'>{d.label}</span>
        <span className='stat-item-value'>{d.value.toFixed(2)}</span>
      </div>
    );

    return (
      <div>
        <div>
          Current date range: {min.toISOString().split('T')[0]} - {max.toISOString().split('T')[0]}
        </div>
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
      </div>
    )
  }
}
