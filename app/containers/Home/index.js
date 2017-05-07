import React from 'react';

import HomeInfo from 'components/Home/info';
import HomeContent from 'components/Home/content';

export default class Home extends React.Component {
  render () {
    return (<div className='home'>
      <div className='home-info'>
        <HomeInfo/>
      </div>
      <div className='home-content'>
        <HomeContent/>
      </div>
    </div>);
  }
}
