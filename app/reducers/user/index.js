import Auth0Lock from 'auth0-lock';
import { actionTypes } from 'actions/user/follow';

const lock = new Auth0Lock('mIfSPvMFfjb23JvgOeZU45qAkcNPEkXS', 'seng3011.au.auth0.com',{
    theme: {
      // logo: 'logo/Sauce.png',
      primaryColor: '#446CB3',
      title: 'Log in',
      name: 'StockOverflow',
    }
  });

const user = localStorage.getItem('userInfo') ?
  {
    ...JSON.parse(localStorage.getItem('userInfo')),
    lock,
  }:
  {
    lock,
    following: [],
    profile:{},
  };


const default_state = user;

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
      case actionTypes.LOGIN: {
        return {
          ...state,
          token: action.payload,
        }
      }
      case 'LOGGEDIN': {
        const user = {... state, token: action.payload};
        localStorage.setItem('userInfo', JSON.stringify(user));
        return user;
      }
      case 'LOGOUT': {
        const user = {...state, token: null};
        localStorage.setItem('userInfo', JSON.stringify(user));
        return user;
      }
      case 'LOAD_PROFILE_FINISH': {
        const user = {...state, profile:action.payload};
        localStorage.setItem('userInfo', JSON.stringify(user));
        return user;
      }
  }
  return state;
};
