import data from 'components/SearchBar/data.json';

let goodCompanies = {};
const companies = data.data;

companies.map((e) => {
  goodCompanies[e.id] = e;
});

// console.log(goodCompanies);

export const getCmp = (cid) => {
  console.log(cid.substr(0, 3));
  return goodCompanies[cid.substr(0, 3)].name;
};
