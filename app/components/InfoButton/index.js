import React from 'react';

export default class InfoButton extends React.Component {
  render () {
    const { text, right } = this.props;

    return (
      <span className='popover-container'>
        <img src='/static/images/info.svg' className='info-button' />
        <span className={(right ? 'right ' : '' ) + 'span-popover'}>{text}</span>
      </span>
    );
  }
}
