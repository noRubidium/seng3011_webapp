import React from 'react';

import SentimentChart from 'components/SentimentChart';
import LoadableComponent from 'components/LoadableComponent';


export default class SentimentEmotion extends LoadableComponent {
  constructor (props) {
    super(props);
  }
  render() {
    this.loaded_object = null;

    if (loaded) {

      const { label, score } = sentiment;
      const positive = label === 'positive';
      const style = `label label-${positive ? 'success':'danger'}`

      this.loaded_object = (<div className='white-bg'>
        <div className='sub-title'>Sentiment Analysis</div>
          <div>
              <span className={style}>
                {label} article
              </span>
              <span className='sentiment-score' style={{'float':'right'}}>
                Sentiment strength: {score.toFixed(3)}
              </span>
          </div>
        <SentimentChart data={emotion} />
      </div>);
    }
    return super.render();
  }
}
