import React from 'react';

import ListItem from 'components/ListItem'

export default class NewsArticle extends React.Component {

  prettifyDate(date_string) {
    const d = new Date(date_string)
    const toDisplay = d.toString().split(' GMT')[0];
    return toDisplay;
  }

  render() {
    const { title, date, image, content, url } = this.props;
    const paras = content.split('\n').map((e) => <p>{e}</p>);
    return (
      <div>
        <div className='title'>{title}</div>
        <div className='news-date-container'>{this.prettifyDate(date)}</div>
        <div className='news-content'>
          <img src={image} style={{'width': '50%', margin: '1em', float: 'right'}}></img>
          {paras}
        </div>
        <div className='news-link'>
          <a href={url} target='_blank'>Visit source article</a>
        </div>
      </div>
    );
  }
}
