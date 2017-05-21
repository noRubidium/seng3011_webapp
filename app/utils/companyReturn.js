export const getReturn = (data, company) => {
  let company_returns = {};
  company_returns['label'] = company;
  let prev = 0;
  const array = data.slice(1).map((v, i) => {
    if (!data[i-1]) return {'value': 0, 'date': v.date};
    const return_percentage = ((v.value-data[0].value)/data[0].value) * 100;
    return {'value': return_percentage, 'date': v.date};
  })
  company_returns['values'] = array;

  return company_returns;
}
