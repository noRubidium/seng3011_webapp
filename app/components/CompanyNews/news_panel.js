import React from 'react';

export default class NewsPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href={this.props.item.link} className="list-group-item">
        <p className="list-group-item-heading" dangerouslySetInnerHTML={{__html: this.props.item.title}} className='news-panel-heading'/>
        <p className="list-group-item-text" dangerouslySetInnerHTML={{__html: this.props.item.description}} className='news-panel-description'/>
        <p className="list-group-item-text" className='news-panel-date'>{this.props.item.pubDate}</p>
      </a>
    )
  }

}
