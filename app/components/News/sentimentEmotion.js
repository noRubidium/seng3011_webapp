import React from 'react';

import SentimentChart from 'components/SentimentChart';
import LoadableComponent from 'components/LoadableComponent';


export default class SentimentEmotion extends LoadableComponent {
  constructor (props) {
    super(props);
  }
  render() {
    this.loaded_object = null;
    const { loaded, emotion } = this.props;

    if (loaded) {
      this.loaded_object = (<div className='white-bg'>
        <div className='sub-title'>Sentiment Analysis</div>
        <SentimentChart data={emotion} />
      </div>);
    }
    return super.render();
  }
}
