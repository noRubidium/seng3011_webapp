import React from 'react';

export default class NewsPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log("HEURO",this.props);
    return (
      <a href={this.props.item.link} className="list-group-item">
        <p className="list-group-item-heading" dangerouslySetInnerHTML={{__html: this.props.item.title}} style={{"font-weight":"bold", "font-size":"14px"}}/>
        <p className="list-group-item-text" dangerouslySetInnerHTML={{__html: this.props.item.description}} style={{"font-size":"12px", "margin-top":"10px"}}/>
        <p className="list-group-item-text" style={{"color":"#0f0f0f", "font-size":"12px", "margin-top":"10px"}}>{this.props.item.pubDate}</p>
      </a>
    )
  }

}
