import React from 'react';
// import getStandardDev from 'app/utils/statsUtil.js'

export default class CompareStats extends React.Component {
  render () {
    const { companies, minDate, maxDate, data } = this.props;

    const volatilityStats = companies.map((c) =>
        <StatCompareItem
          company={c}
          value={4}
        />
    );

    const returnStats = companies.map((c) =>
        <StatCompareItem
          company={c}
          value={''}
        />
    );

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
