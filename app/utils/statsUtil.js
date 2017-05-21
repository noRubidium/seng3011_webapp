import Math

export const getStandardDev = (data, min, max) => {
  const set_range = data.filter(function(v)){
    return new Date(v.date).getTime() >= min && new Date(v.date).getTime() <= max;
  }
  return standardDeviation(set_range);
}

export const sum = (array) => {
	var num = 0;
	for (var i = 0, l = array.length; i < l; i++) num += array[i];
	return num;
}

export const mean = (array) => {
	return sum(array) / array.length;
}

export const variance = (array) => {
	const mean = mean(array);
	return mean(array.map(function(num) {
		return Math.pow(num - mean, 2);
	}));
},

export const standardDeviation = (array) => {
	return Math.sqrt(variance(array));
},
