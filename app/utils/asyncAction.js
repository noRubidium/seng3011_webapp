export function async_action (loading_action, loaded_action_type, dispatch, url) {
  dispatch(loading_action);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: loaded_action_type,
        payload: data,
      });
    });
}
