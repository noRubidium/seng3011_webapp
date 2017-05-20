const LOGGEDIN = 'LOGGEDIN';
const LOGOUT = 'LOGOUT';
const LOAD_PROFILE_FINISH = 'LOAD_PROFILE_FINISH';
export const actionTypes = {
  LOGGEDIN,
  LOGOUT,
}

export function login(auth){
  return function(dispatch){
    const callback = (result) => {
      localStorage.setItem('id_token', result.token)
      dispatch({
        type: LOGGEDIN,
        payload:result.token
      });
    }
    auth.on('authenticated',callback)
    auth.show()
  }
}

export function logout(){
  localStorage.removeItem('id_token');
  return {
    type: LOGOUT,
  }
}

export function loadProfile(auth, idToken){
  return function(dispatch){
    const callback = (err, profile) => {
      dispatch({
        type: LOAD_PROFILE_FINISH,
        payload: profile,
      });
    }
    auth.getProfile(idToken, callback);
  }
}
