import X2JS from 'x2js';

export default function async_action_xml(loading_action, loaded_action_type, dispatch, url, load_failure_action_type='REALLY_RANDOM_ACTION') {
  dispatch(loading_action);
  const x2js = new X2JS();
  fetch(url)
    .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.text())
    .then(str => {
      
      const data = (x2js.xml2js(str));
      if (!data) {
        throw Error('No data');
      }
      dispatch({
        type: loaded_action_type,
        payload: data.rss.channel.item,
      });
    })
    .catch((e) => {
      
      dispatch({
        type: load_failure_action_type,
        payload: e,
      })
    });
};
