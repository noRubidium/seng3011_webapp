import React from 'react';

class StatCompareItem extends React.Component {

  render() {
    const { company, value } = this.props;

    console.log(this.props)

    return (
      <div className='stat-item'>
        <span className='stat-item-company'>{company}</span>
        <span className='stat-item-value'>{value}</span>
      </div>
    )
  }

}
