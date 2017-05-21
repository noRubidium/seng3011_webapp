import React from 'react';

export default class CompareStats extends React.Component {
  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body compare-stats-panel'>
          <div className='row'>
            <div className='col-sm-4 compare-stats'>
              <div className='compare-stats-sub-title sub-title'>Stats #1</div>
            </div>
            <div className='col-sm-4 compare-stats side-border'>
              <div className='compare-stats-sub-title sub-title'>Stats #2</div>
            </div>
            <div className='col-sm-4 compare-stats'>
              <div className='compare-stats-sub-title sub-title'>Stats #3</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
