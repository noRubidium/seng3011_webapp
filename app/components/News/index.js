import React from 'react';

import ListItem from 'components/ListItem'

export default class NewsArticle extends React.Component {
  render() {
    const { title, content } = this.props;

    return (
      <div>
        <div className='title'>{title}</div>
        <div className='news-content'>
          {content}
        </div>
      </div>
    );
  }
}
