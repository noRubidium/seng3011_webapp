import React from 'react';
import LoadableComponent from 'components/LoadableComponent';

class SentimentLoad extends LoadableComponent {
  render () {
    this.loaded_object = null;
    const { loaded, sentiment } = this.props;
    if (loaded) {
      const { label, score } = sentiment;
      const positive = label === 'positive';
      const style = `label label-${positive ? 'success':'danger'}`
      this.loaded_object = (
        <div>
          <div className='pull-right'>
            <div className={style}>
              {label} article
            </div>
            <div className='sentiment-strength'>
              strength: {score.toFixed(3)}
            </div>
          </div>
        </div>
      );
    }
    return super.render();
  }
}

export default class Sentiment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      loading: false,
      loaded: false,
      error: false,
      sentiment: null,
    };
    this.start_loading();
  }

  start_loading = () => {
    if (!this.props.analyse || this.state.started) {
      return;
    }
    this.setState({started: true, loading: true});
    const url = `http://api.kaiworship.xyz/news/lnk/${this.props.url}`
    fetch(url)
      .then((response) => {
        if (!response.ok) return;
        return response.json();
      })
      .then((data) => {
        if (!data) {
          this.setState({loading: false, error: true});
          return;
        }
        this.setState({loading: false, loaded: true, sentiment: data.sentiment})
      })
      .catch((e) => {
        this.setState({loading: false, error: true});
      });
  }

  componentWillMount () {
    this.start_loading();
  }

  componentDidUpdate () {
    this.start_loading();
  }
  render() {
    return (<SentimentLoad
      loading={this.state.loading}
      loaded={this.state.loaded}
      error={this.state.error}
      sentiment={this.state.sentiment}
      className={'news-sentiment'}
    />);
  }
}
