import React from 'react';
import { connect } from 'react-redux';

import CompareStats from 'components/Compare';
import Chart from 'components/Industry/chart';
import LoadableComponent from 'components/LoadableComponent';
// import { load_compare } from 'actions/news';

@connect((store) => {
  return {
    ...store.compare,
  };
})
export default class News extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
  }

  render () {
    const loaded = true;
    if (loaded) {
      this.loaded_object = (
        <div>
          <div className='title'> Comparison for MYR, WES, WOW </div>
          <center><Chart/></center>
          <CompareStats/>
        </div>
      )
    }
    return this.loaded_object;
  }
}
