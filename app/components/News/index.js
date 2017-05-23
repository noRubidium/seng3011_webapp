import React from 'react';

import ListItem from 'components/ListItem'

export default class NewsArticle extends React.Component {

  prettifyDate(date_string) {
    const splitted = date_string.split('T');
    const date = splitted[0];
    const time_string = splitted[1];
    console.log('ts',splitted);
    const time_regex = new RegExp('(.*)([-\+].*)');
    const match = time_regex.exec(time_string);
    console.log('match',match);
    const time = match[1];
    const timezone = match[2];
    return (
      <div>
        {date} {time} GMT{timezone}
      </div>
    )
  }

  render() {
    const { title, date, image, content } = this.props;
    const paras = content.split('\n').map((e) => <p>{e}</p>);
    return (
      <div>
        <div className='title'>{title}</div>
        <div className='news-date'>{this.prettifyDate(date)}</div>
        <div className='news-image'>
          <img src={image} style={{'width': '100%'}}></img>
        </div>
        <div className='news-content'>
          {paras}
        </div>
      </div>
    );
  }
}
