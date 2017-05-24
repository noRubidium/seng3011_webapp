import React from 'react';

export default class InfoButton extends React.Component {
  render () {
    const { text } = this.props;

    return (
      <span style={{color: 'black'}} className='popover-container'>
        <img src='/static/images/info.svg' className='info-button' />
        <span className='span-popover'>{text}</span>
      </span>
    );
  }
}
