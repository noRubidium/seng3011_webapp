export function async_action (loading_action, loaded_action_type, dispatch, url, load_failure_action_type='REALLY_RANDOM_ACTION') {
  dispatch(loading_action);
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        return ;
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (!data) {
        dispatch({
          type: load_failure_action_type,
          payload: 'No data loaded',
        });
        return;
      }
      dispatch({
        type: loaded_action_type,
        payload: data,
      });
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: load_failure_action_type,
        payload: e,
      });
    });
}
