import React from 'react';
import { getStandardDev, getMean } from 'utils/statsUtil';
import StatCompareItem from './statItem';
import priceStats from './compareStats.json';
import industryPEs from 'components/CompanyPrice/industryPE.json';
import data from 'components/SearchBar/data.json';
import InfoButton from 'components/InfoButton';

const companyData = data.data;

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

  getDyStatus(dy) {
    if (dy > 4.59) {
      return 'a high';
    } else if (dy < 3.59) {
      return 'a low';
    } else {
      return 'an average';
    }
  }

  getDyStatusClassName(dy) {
    if (dy > 4.59) {
      return 'green-color';
    } else if (dy < 3.59) {
      return 'red-color';
    } else {
      return 'yellow-color';
    }
  }

  getDyRelation(dy) {
    if (dy > 4.59) {
      return 'higher than';
    } else if (dy < 3.59) {
      return 'lower than';
    } else {
      if (dy === 4.09) {
        return 'equal to';
      }
      return 'close to';
    }
  }

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

      const companyInfo = companyData.filter(x => x.id === s.comp.slice(0,3));
      const gicsIndustry = companyInfo[0].industry;
      const industryPE = industryPEs[gicsIndustry];
      const peDifference = s.pe - industryPE;
      const higherLower = peDifference > 0.0 ? 'higher' : 'lower';
      const underOver = peDifference > 0.0 ? 'over' : 'under';

      const peInfoText = 'This is ' + higherLower + ' than the ' + gicsIndustry + ' P/E ratio of ' + industryPE + ', suggesting that it is ' + underOver + 'valued.';

      return(
        <div className={peDifference > 0.0 ? 'red-color' : 'green-color'}>
          <div className='stat-item'>
            <span className='stat-item-company'>{s.comp}</span>
            <span className='stat-item-value'>{s.pe} <InfoButton text={peInfoText} /></span>
          </div>
        </div>);
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

    const dyStats = sortedDYs.map((s) => {

      const dyInfoText = 'This is ' + this.getDyStatus(s.dy) + ' dividend yield. It is ' + this.getDyRelation(s.dy) + ' the All Ordinaries Index\'s current annual dividend yield of 4.09.';

      return(
      <div className={this.getDyStatusClassName(s.dy)}>
        <div className='stat-item'>
          <span className='stat-item-company'>{s.comp}</span>
          <span className='stat-item-value'>{s.dy} <InfoButton text={dyInfoText} /></span>
        </div>
      </div>);
    });

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
                  Volatility
                </div>
                <div>
                  {volatilityStats}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
