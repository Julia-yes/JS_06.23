function customFilter(callback, obj) {
  if (!callback || typeof callback !== "function") {
    throw new Error("Invalid argument.");
  }
  if ((obj && typeof obj !== "object") || obj === null) {
    throw new Error("Invalid argument.");
  }
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    if (obj) {
      if (callback.call(obj, this[i], i, this)) {
        arr.push(this[i]);
      }
    } else {
      if (callback.call(this, this[i], i, this)) {
        arr.push(this[i]);
      }
    }
  }
  return arr;
}
Array.prototype.customFilter = customFilter;

function bubbleSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Invalid argument.");
  }
  for (let i = 0; i < arr.length; i++) {
    if (!Number.isFinite(arr[i])) {
      throw new Error("Invalid argument.");
    }
  }
  const result = [...arr];
  let j = 0;
  while (j < result.length) {
    for (let i = 0; i < result.length; i++) {
      if (result[i] > result[i + 1]) {
        let bigger = result[i];
        result[i] = result[i + 1];
        result[i + 1] = bigger;
      }
    }
    j++;
  }
  return result;
}
function storageWrapper(func, arr) {
  if (!func || typeof func !== "function") {
    throw new Error("Invalid argument.");
  }
  if (arr && !Array.isArray(arr)) {
    throw new Error("Invalid argument.");
  }

  if (arr) {
    return function () {
      const result = func();
      arr.push(result);
      return result;
    };
  } else {
    const arrayResults = [];
    return function () {
      const result = func();
      arrayResults.push(result);
      return arrayResults;
    };
  }
}
