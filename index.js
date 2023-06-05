function makeDeepCopy(obj) {
  if (
    !obj ||
    typeof obj !== "object" ||
    obj instanceof Map ||
    Array.isArray(obj) ||
    obj instanceof Set
  ) {
    throw new Error();
  } else {
    return makeCopyOfObject(obj);
  }

  function makeCopyOfObject(prop) {
    if (typeof prop !== "object" || prop === null || prop === undefined) {
      return prop;
    }
    if (prop instanceof Map) {
      const copy = new Map();
      prop.forEach((value, key) => {
        copy.set(makeCopyOfObject(key), makeCopyOfObject(value));
      });
      return copy;
    }

    if (prop instanceof Set) {
      const copy = new Set();
      prop.forEach((value) => {
        copy.add(makeCopyOfObject(value));
      });
      return copy;
    }

    let arrayFromObj = Object.entries(prop);
    for (let i = 0; i < arrayFromObj.length; i++) {
      for (let j = 0; j <= 1; j++) {
        if (typeof arrayFromObj[i][j] === "object") {
          arrayFromObj[i][j] = makeCopyOfObject(arrayFromObj[i][j]);
        }
      }
    }
    return Object.fromEntries(arrayFromObj);
  }
}

function createIterable(from, to) {
  if (
    arguments.length < 2 ||
    to <= from ||
    !Number.isInteger(from) ||
    !Number.isInteger(to) ||
    typeof from !== "number" ||
    typeof to !== "number"
  ) {
    throw new Error("error");
  }

  return {
    from,
    to,
    [Symbol.iterator]: function () {
      return {
        current: this.from,
        last: this.to,
        next() {
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        },
      };
    },
  };
}

function createProxy(obj) {
  if (
    !obj ||
    typeof obj !== "object" ||
    obj instanceof Map ||
    Array.isArray(obj) ||
    obj instanceof Set
  ) {
    throw new Error();
  } else {
    return (obj = new Proxy(obj, {
      get(target, prop) {
        if (target[prop].hasOwnProperty("readAmount")) {
          target[prop].readAmount = ++target[prop].readAmount;
        } else {
          target[prop] = { value: target[prop], readAmount: 1 };
        }
      },
      set(target, prop, val) {
        if (target.hasOwnProperty(prop)) {
          if (typeof val === typeof target[prop].value) {
            target[prop].value = val;
          }
        } else {
          target[prop] = { value: val, readAmount: 0 };
        }
      },
    }));
  }
}
