import React from 'react';

export default class IndustryInfo extends React.Component {
  render() {
    const { title, details, type } = this.props;
    const typeClass = type === 'Retail' ? 'label-primary' : 'label-info';
    return(
      <div className='white-bg industry-info'>
        <div className='title'>{title}</div>
        <span className={`label ${typeClass} industry-page-label`}>{type}</span>
        <div className='details'>{details}</div>
      </div>
    );
  }
}
