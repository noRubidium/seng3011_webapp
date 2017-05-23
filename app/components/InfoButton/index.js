import React from 'react';

export default class InfoButton extends React.Component {
  render () {
    const { text } = this.props;

    return (
      <img src='/static/images/info.svg'
           className='info-button'
           data-container='body'
           data-toggle='popover'
           data-placement='right'
           data-content={text}>
      </img>
    );
  }
}
