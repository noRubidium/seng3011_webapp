export const getReturn = (data, company) => {
  let company_returns = {};
  let array = [];
  company_returns['label'] = company;

  data.map((v, i) => {
    const return_percentage = ((v-data[i-1])/v) * 1000;
    array.push({'value':return_percentage, 'date':v.date});
  })
  company_returns['values'] = array;

  return company_returns;
}
