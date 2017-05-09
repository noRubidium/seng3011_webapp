import React from 'react';

export default class HomeInfo extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div className='home-title'> RAP </div>
        <div className='home-info-title'> Retail Analytics Platform </div>
      </div>
    );
  }
}
