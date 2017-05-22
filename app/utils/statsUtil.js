const filterDates = (data, min, max) => {
  if (min === max) {
    return data.map((e) => e.value);
  }
  return data.filter((v) => {
    return new Date(v.date) >= min && new Date(v.date) <= max;
  }).map((e) => e.value);
}
export const getStandardDev = (data, min, max) => {
  const set_range = filterDates(data, min, max);
  return standardDeviation(set_range);
}

export const sum = (array) => {
  var num = 0;
  for (var i = 0, l = array.length; i < l; i++) num += array[i];
  return num;
}

export const getMean = (data, min, max) => {
  return mean(filterDates(data, min, max));
}

const mean = (data) => {
  return (sum(data) / data.length);
}

export const variance = (array) => {
  const meanV = mean(array);
  return mean(array.map(function(num) {
    return Math.pow(num - meanV, 2);
  }));
}

export const standardDeviation = (array) => {
  return Math.sqrt(variance(array));
}
