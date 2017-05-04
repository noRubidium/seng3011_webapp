import { actionTypes } from 'actions/counter';

export default (state={count:0}, action) => {
  switch (action.type) {
    case actionTypes.INC:
      return {...state, count: state.count + action.payload};
      break;
    case actionTypes.DEC:
      return {...state, count: state.count - action.payload};
      break;
  }
  return state;
};
