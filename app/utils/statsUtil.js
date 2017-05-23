const filterDates = (data, min, max) => {
  if (min === max) {
    return data.map((e) => e.value);
  }
  return data.filter((v) => {
    return new Date(v.date) >= min && new Date(v.date) <= max;
  }).map((e) => e.value);
}
export const getStandardDev = (data, min, max, m=0, b=0) => {
  const set_range = filterDates(data, min, max);
  return standardDeviation(set_range, m, b);
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

export const variance = (array, m, b) => {
  if (m || b) {
    return mean(array.map((num, i) => {
      return Math.pow(num - (m * i + b), 2);
    }));
  }
  const meanV = mean(array);
  return mean(array.map(function(num) {
    return Math.pow(num - meanV, 2);
  }));
}

export const standardDeviation = (array, m, b) => {
  return Math.sqrt(variance(array, m, b));
}


export const findTrend = (data, min, max) => {
  if (min === max) {
    return findLineByLeastSquares(data.map((e, i) => i), data.map((e) => e.value));
  }
  const fData = data.filter((v) => {
    return new Date(v.date) >= min && new Date(v.date) <= max;
  });
  return findLineByLeastSquares(fData.map((e,i)=>i), fData.map((e) => e.value));
}

function findLineByLeastSquares(values_x, values_y) {
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var count = 0;

    /*
     * We'll use those variables for faster read/write access.
     */
    var x = 0;
    var y = 0;
    var values_length = values_x.length;

    if (values_length != values_y.length) {
        throw new Error('The parameters values_x and values_y need to have same size!');
    }

    /*
     * Nothing to do.
     */
    if (values_length === 0) {
        return [0, 0];
    }

    /*
     * Calculate the sum for each of the parts necessary.
     */
    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = values_y[v];
        sum_x += x;
        sum_y += y;
        sum_xx += x*x;
        sum_xy += x*y;
        count++;
    }

    /*
     * Calculate m and b for the formular:
     * y = x * m + b
     */
    var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
    var b = (sum_y/count) - (m*sum_x)/count;

    return [m, b];
    // /*
    //  * We will make the x and y result line now
    //  */
    // var result_values_x = [];
    // var result_values_y = [];
    //
    // for (var v = 0; v &lt; values_length; v++) {
    //     x = values_x[v];
    //     y = x * m + b;
    //     result_values_x.push(x);
    //     result_values_y.push(y);
    // }
    //
    // return [result_values_x, result_values_y];
}
