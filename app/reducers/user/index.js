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
      const user1 = {
        ...state,
        following: state.following.filter((e) => e != payload).concat([payload]),
      };
      localStorage.setItem('userInfo', JSON.stringify(user1));
      return user1;
    case actionTypes.UNFOLLOW:
      const user2 = {
        ...state,
        following: state.following.filter((e) => e != payload),
      };
      localStorage.setItem('userInfo', JSON.stringify(user2));
      return user2;
      case actionTypes.LOGIN: {
        return {
          ...state,
          token: action.payload,
        }
      }
      case 'LOGGEDIN': {
        const user3 = {... state, token: action.payload};
        localStorage.setItem('userInfo', JSON.stringify(user3));
        return user3;
      }
      case 'LOGOUT': {
        const user4 = {...state, token: null};
        localStorage.setItem('userInfo', JSON.stringify(user4));
        return user4;
      }
      case 'LOAD_PROFILE_FINISH': {
        const user5 = {...state, profile:action.payload};
        localStorage.setItem('userInfo', JSON.stringify(user5));
        return user5;
      }
  }
  return state;
};
