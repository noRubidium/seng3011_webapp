import React from 'react';

export default class ListItem extends React.Component {
  getFirstColumn(title, content) {
    return(
      <div>
        <h4 className='list-item-title'>{title}</h4>
        {content}
      </div>
    );
  }

  render () {
    const { title, content, secondComponent } = this.props;

    const oneColumn = (
      <div className='col-sm-12'>
        {this.getFirstColumn(title, content)}
      </div>
    );

    const twoColumn = (
      <div>
        <div className='col-sm-10'>
          {this.getFirstColumn(title, content)}
        </div>
        <div className='col-sm-2'>
          {secondComponent}
        </div>
      </div>
    );

    return (
      <div className='list-item panel panel-default'>
		    <div className='panel-body'>
          <div className='row'>
            {
              secondComponent ? twoColumn : oneColumn
            }
          </div>
		    </div>
		  </div>
    );
  }
}
