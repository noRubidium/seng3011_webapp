export default function async_action (loading_action, loaded_action_type, dispatch, url, load_failure_action_type='REALLY_RANDOM_ACTION') {
  dispatch(loading_action);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
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
