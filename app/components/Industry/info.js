import React from 'react';

export default class IndustryInfo extends React.Component {
  render() {
    const { title, details} = this.props;
    return(
      <div className='white-bg'>
        <div className='title'>{title}</div>
        <div className='details'>{details}</div>
      </div>
    );
  }
}
