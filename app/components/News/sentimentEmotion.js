import React from 'react';
import FeelingChart from 'components/Feelings'

export default class SentimentEmotion extends React.Component {
  render() {
    return (
      <div>
        <div className='sub-title'>Sentiment Analysis</div>
        <FeelingChart />
      </div>
    );
  }
}
