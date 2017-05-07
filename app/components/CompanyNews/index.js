import React from 'react';
import { connect } from 'react-redux';
import textToReactMarkup from 'react-markup-text';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_news } from 'actions/company';

@connect((store) => {
  return store.company.company_news;
})
export default class CompanyNews extends LoadableComponent {

  constructor (props) {
    super(props);
    console.log(this);
    const { company_id, dispatch } = this.props;
    load_company_news(company_id, dispatch);
    console.log("HELLOO" + this.props);
  }
  render () {
    const { news } = this.props;
    console.log("THIS IS NEWS:", news);
    this.loaded_object = (<div>
      news for:{this.props.company_id}
      <div className="list-group">
        {
          this.props.news.map((item) => {
            return(
              <a id={item.link} href={item.link} className="list-group-item">
                <p className="list-group-item-heading" dangerouslySetInnerHTML={{__html: item.title}} style={{"font-weight":"bold"}}/>
                <p className="list-group-item-text" dangerouslySetInnerHTML={{__html: item.description}} style={{"font-size":"10pt", "margin-top":"10px"}}/>
                <p className="list-group-item-text" style={{"color":"#0f0f0f", "font-size":"10pt", "margin-top":"10px"}}>{item.pubDate}</p>
              </a>
            );
          })
        }
      </div>
    </div>);
    console.log("LOADEDOBJ: ", this.loaded_object);
    return super.render();
  }
}
