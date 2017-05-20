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

}
