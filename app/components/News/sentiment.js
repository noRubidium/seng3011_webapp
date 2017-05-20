import React from 'react';

export default class Sentiment extends React.Component {
  render() {
    const random = Math.random()
    return (
      <div>
        {
          random > 0.5 ?
          <div className='pull-right'>
            <div className='label label-success'>positive article</div>
            <div className='sentiment-strength'>strength: {random.toFixed(3)}</div>
          </div>
          :
          <div className='pull-right'>
            <div className='label label-danger'>negative article</div>
            <div className='sentiment-strength'>strength: {random.toFixed(3)}</div>
          </div>
        }
      </div>
    );
  }
}
