import React from 'react';
import { getStandardDev, getMean } from 'utils/statsUtil';
import StatCompareItem from './statItem';
import priceStats from './compareStats.json';

const toCompanyStatsItems = (data, min, max, f, cFun=(e)=>e) => {
  return data
  .map((d) => {
    return {label: d.label, value: f(d.values, min, max)};
  })
  .sort((a, b) => cFun(a.value) - cFun(b.value))
  .map((d) =>
    <StatCompareItem company={d.label} value={d.value.toFixed(2)}/>
  );
}

export default class CompareStats extends React.Component {
  render () {
    const { companies, minDate, maxDate, data } = this.props;
    const min = new Date(minDate);
    const max = new Date(maxDate);
    const volatilityStats = toCompanyStatsItems(data, min, max, getStandardDev);

    const returnStats = toCompanyStatsItems(data, min, max, getMean, (e)=>(-e));

    const pes = [];
    for (let key in priceStats) {
      if (companies.indexOf(key) != -1) {
        pes.push({
          comp: key,
          pe: priceStats[key]['pe']
        });
      }
    }

    const sortedPEs = pes.sort((a,b) => a.pe - b.pe);

    const peStats = sortedPEs.map((s) => {
      return(
      <StatCompareItem company={s.comp} value={s.pe.toFixed(2)}/>);
    });

    const dys = [];
    for (let key in priceStats) {
      if (companies.indexOf(key) != -1) {
        dys.push({
          comp: key,
          dy: priceStats[key]['dy']
        });
      }
    }

    const sortedDYs = dys.sort((a,b) => b.dy - a.dy);

    console.log('st', sortedDYs);


    const dyStats = sortedDYs.map((s) => {
      return(
      <StatCompareItem company={s.comp} value={s.dy}/>);
    });

    console.log('dy', dyStats);

    return (
      <div>
        <div className='compare-date-range'>
          <span className='compare-date-range-title'>Current date range: </span>{min.toISOString().split('T')[0]} - {max.toISOString().split('T')[0]}
        </div>
        <div className='panel panel-default'>
          <div className='panel-body compare-stats-panel'>
            <div className='row'>
              <div className='col-md-3 compare-stats'>
                <div className='compare-stats-sub-title sub-title'>
                  Volatility
                </div>
                <div>
                  {volatilityStats}
                </div>
              </div>
              <div className='col-md-3 compare-stats' style={{borderLeft: '1px solid #ddd'}}>
                <div className='compare-stats-sub-title sub-title'>
                  Return
                </div>
                <div>
                  {returnStats}
                </div>
              </div>
              <div className='col-md-3 compare-stats' style={{borderLeft: '1px solid #ddd'}}>
                <div className='compare-stats-sub-title sub-title'>
                  P/E Ratio
                </div>
                <div>
                  {peStats}
                </div>
              </div>
              <div className='col-md-3 compare-stats' style={{borderLeft: '1px solid #ddd'}}>
                <div className='compare-stats-sub-title sub-title'>
                  Dividend Yield
                </div>
                <div>
                  {dyStats}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
