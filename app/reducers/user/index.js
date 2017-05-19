import { actionTypes } from 'actions/user/follow';

const default_state = {
  loading: false,
  loaded: true,
  error: false,
  /* Stub data for testing display*/
  user: 'blah',
  following: [],
  /* ... add more! */
};

export default (state=default_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FOLLOW:
      return {
        ...state,
        following: state.following.filter((e) => e != payload).concat([payload]),
      };
    case actionTypes.UNFOLLOW:
      return {
        ...state,
        following: state.following.filter((e) => e != payload),
      };
  }
  return state;
};
