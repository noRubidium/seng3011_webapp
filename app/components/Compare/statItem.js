import React from 'react';

export default class StatCompareItem extends React.Component {

  render() {
    const { company, value } = this.props;
    return (
      <div className='stat-item'>
        <span className='stat-item-company'>{company}</span>
        <span className='stat-item-value'>{value}</span>
      </div>
    )
  }

}
