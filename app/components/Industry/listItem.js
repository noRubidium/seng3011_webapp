import React from 'react';

import ListItem from 'components/ListItem'

export class IndustryPercentage extends React.Component {
  render() {
    const { content } = this.props
    return(
      <div className={'list-item-second ' + (content > 0 ? 'green' : 'red')}>
        {content}%
      </div>
    );
  }
}

export default class IndustryListItem extends ListItem {
  getFirstColumn(title, content) {
    const { type } = this.props;
    const typeClass = type === 'Retail' ? 'label-primary' : 'label-info';
    return(
      <div>
        <h4 className='list-item-title industry-list-item-title'>{title}</h4>
        <span className={`label ${typeClass} industry-type`}>{type}</span>
        <div>{content}</div>
      </div>
    );
  }
}
