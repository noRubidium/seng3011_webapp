import React from 'react';

import ListItem from 'components/ListItem'

export default class NewsArticle extends React.Component {
  render() {
    const { title, content } = this.props;
    const paras = content.split('\n').map((e) => <p>{e}</p>);
    return (
      <div>
        <div className='title'>{title}</div>
        <div className='news-content'>
          {paras}
        </div>
      </div>
    );
  }
}
