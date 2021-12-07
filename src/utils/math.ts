export const floorToOne = (num: number) => {
  return Math.floor((num + Number.EPSILON) * 10) / 10;
};

export const floorToTwo = (num: number) => {
  return Math.floor((num + Number.EPSILON) * 100) / 100;
};

export const floorToThree = (num: number) => {
  return Math.floor((num + Number.EPSILON) * 1000) / 1000;
};

export const toPercentage = (num: number, callback?: (el: number) => number) => {
  const value = num * 100;

  if (callback) {
    return callback(value);
  }
  return value;
};

export const toNumber = (value: unknown, defVal = 0) => {
  const num = Number(value);
  return !isNaN(num) ? num : defVal;
};
