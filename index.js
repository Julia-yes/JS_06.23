function getDistance(x1, y1, x2, y2) {
  if (arguments.length !== 4) {
    throw new Error();
  }

  for (let item of arguments) {
    if (typeof item !== "number" || item < -1000 || item > 1000) {
      throw new Error();
    }
  }

  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  if (Number.isInteger(distance)) {
    return distance;
  } else {
    return Number(distance.toFixed(2));
  }
}

function switchPlaces(arr) {
  if (!Array.isArray(arr)) {
    throw new Error();
  }

  let centre = arr.length / 2;

  if (centre % 2 !== 0) {
    centre = Math.ceil(centre);
  }

  let result = arr.slice(centre);

  if (arr.length % 2 !== 0) {
    result.push(arr[centre - 1]);
    result = result.concat(arr.slice(0, centre - 1));
  } else {
    result = result.concat(arr.slice(0, centre));
  }

  return result;
}

function getDivisors(param) {
  if (typeof param !== "number" || !isFinite(param)) {
    throw new Error();
  }

  const result = [];

  for (let i = param; i > 0; i--) {
    if (param % i === 0) {
      result.push(i);
    }
  }

  return result;
}
