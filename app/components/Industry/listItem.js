import React from 'react';

import ListItem from 'components/ListItem'

export default class IndustryListItem extends ListItem{
  getSecondColumn(content) {
    return(
      <div> {content} </div>
    );
  }
}
