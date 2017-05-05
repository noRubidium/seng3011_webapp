import { actionTypes } from 'actions/company';

const default_state = {
  
};

export default (state=default_state, action) => {
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
