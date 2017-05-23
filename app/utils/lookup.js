import data from 'components/SearchBar/data.json';
import industries from 'components/Industry/data';

let goodCompanies = {};
const companies = data.data;

companies.map((e) => {
  goodCompanies[e.id] = e;
});

export const getCmp = (cid) => {
  const obj = goodCompanies[cid.substr(0, 3)];
  return obj ? obj.name : '';
};

export const getType = (id) => {
  const industry = industries.filter((i) => i.id === id)[0];
  return industry.type;
};
