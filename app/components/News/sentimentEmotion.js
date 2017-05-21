import React from 'react';
import SentimentChart from 'components/SentimentChart'

export default class SentimentEmotion extends React.Component {
  render() {
    return (
      <div>
        <div className='sub-title'>Sentiment Analysis</div>
        <SentimentChart />
      </div>
    );
  }
}
