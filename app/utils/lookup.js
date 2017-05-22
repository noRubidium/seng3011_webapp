import data from 'components/SearchBar/data.json';

let goodCompanies = {};
const companies = data.data;

companies.map((e) => {
  goodCompanies[e.id] = e;
});

export const getCmp = (cid) => {
  return goodCompanies[cid.substr(0, 3)].name;
};
