const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';

export const actionTypes = {
  FOLLOW,
  UNFOLLOW,
}

export function follow (cmp) {
  return {
    type: FOLLOW,
    payload: cmp,
  };
}

export function unfollow (cmp) {
  return {
    type: UNFOLLOW,
    payload: cmp,
  };
}
