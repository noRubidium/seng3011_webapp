const INC = 'COUNTER_INC';
const DEC = 'COUNTER_DEC';

export const actionTypes = {INC, DEC};

export const inc = (d=1) => {
  return {type: INC, payload: d};
};

export const dec = (d=1) => {
  return {type: DEC, payload: d};
};
