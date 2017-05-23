export default function csv2json (data) {
  const result = data.split('\n')
    .filter((s) => (s.split(',').length === 7 && parseFloat(s.split(',')[5])))
    .map((s) => {
      const d = s.split(',');
      return {'date': d[0], 'value': parseFloat(d[5])};
    });
  return result;
}
